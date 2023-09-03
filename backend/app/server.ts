import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import { Group } from './database/group';
import { User } from './database/user';
import { UserGroup } from './database/userGroup';
import { Label } from './database/label';
import { UserLabel } from './database/userLabel';
import { GroupLabel } from './database/groupLabel';
import { MonthlyLimit } from './database/monthlyLimit';
import { Transaction } from './database/transaction';
import { Contribution } from './database/contribution';
import { routes } from './routes/routes';

config();
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(session({ secret: process.env.EXPRESS_SECRET ?? '', proxy: true, resave: false, saveUninitialized: false, cookie: { maxAge: 3600000 } }));
app.use(authChecker);

const types: ((conn: Sequelize) => void)[] = [
  User.register,
  Group.register,
  UserGroup.register,
  Label.register,
  UserLabel.register,
  GroupLabel.register,
  MonthlyLimit.register,
  Transaction.register,
  Contribution.register
];

const login: string = process.env.DB_CS ?? '';

const sequelize: Sequelize = new Sequelize(login, {
  logging: true
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error(error);
    return;
  }

  // Initialize
  types.forEach(func => {
    func(sequelize);
  });

  // To create the tables model if they do not exist on the database
  // Association Class UserGroup
  User.belongsToMany(Group, { through: UserGroup });
  Group.belongsToMany(User, { through: UserGroup });
  UserGroup.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  User.hasMany(UserGroup);
  UserGroup.belongsTo(Group, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  Group.hasMany(UserGroup);

  // Association Class UserLabel
  User.belongsToMany(Label, { through: UserLabel });
  Label.belongsToMany(User, { through: UserLabel });
  UserLabel.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  User.hasMany(UserLabel);
  UserLabel.belongsTo(Label, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  Label.hasMany(UserLabel);
  

  // Association Class GroupLabel
  Group.belongsToMany(Label, { through: GroupLabel });
  Label.belongsToMany(Group, { through: GroupLabel });
  GroupLabel.belongsTo(Group, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  Group.hasMany(GroupLabel);
  GroupLabel.belongsTo(Label, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  Label.hasMany(GroupLabel);

  // Monthly limit
  // Warning : should not let the possibilities to have a user and a userLabel at the same time {COMPLETE, DISJOINT}
  User.hasMany(MonthlyLimit);
  MonthlyLimit.belongsTo(User);
  UserLabel.hasMany(MonthlyLimit);
  MonthlyLimit.belongsTo(UserLabel);

  // Transaction relations
  Transaction.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
  User.hasMany(Transaction);
  Group.hasMany(Transaction);
  Transaction.belongsTo(Group);
  Label.hasMany(Transaction);
  Transaction.belongsTo(Group);

  // Association Class Contribution
  User.belongsToMany(Transaction, { through: Contribution });
  Transaction.belongsToMany(User, { through: Contribution });
  Contribution.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  User.hasMany(Contribution);
  Contribution.belongsTo(Transaction, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  Transaction.hasMany(Contribution);
  

  await User.sync();
  await Group.sync();
  await UserGroup.sync();

  await Label.sync();
  await UserLabel.sync();
  await GroupLabel.sync();

  await MonthlyLimit.sync();

  await Transaction.sync();
  await Contribution.sync();

  routes(app, sequelize);

  console.log('🚀 We are live on http://localhost:' + port + ' 🚀');
});

function authChecker(req: Request, res: Response, next: any) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.session.username || req.path==='/api/login' || req.path==='/api/register') {
    next();
  } else {
    res.json({ error: 'Vous n\'êtes pas connecté' });
  }
};