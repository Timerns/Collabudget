import express, { Express, Request, Response } from 'express';
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


config();
const app = express();
const port = 8000;

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

const sequelize: Sequelize = new Sequelize('postgres://postgres:Pa$$w0rd@localhost:5432/colla_db', {
  logging: true
});

app.listen(port, async () => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World ' + process.env.HELLO);
  });

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
  User.hasMany(UserGroup);
  UserGroup.belongsTo(User);
  Group.hasMany(UserGroup);
  UserGroup.belongsTo(Group);

  // Association Class UserLabel
  User.belongsToMany(Label, { through: UserLabel });
  Label.belongsToMany(User, { through: UserLabel });
  User.hasMany(UserLabel);
  UserLabel.belongsTo(User);
  Label.hasMany(UserLabel);
  UserLabel.belongsTo(Label);

  // Association Class GroupLabel
  Group.belongsToMany(Label, { through: GroupLabel });
  Label.belongsToMany(Group, { through: GroupLabel });
  Group.hasMany(GroupLabel);
  GroupLabel.belongsTo(Group);
  Label.hasMany(GroupLabel);
  GroupLabel.belongsTo(Label);

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
  Transaction.belongsTo(Group)

  // Association Class Contribution
  User.belongsToMany(Transaction, { through: Contribution });
  Transaction.belongsToMany(User, { through: Contribution });
  User.hasMany(Contribution);
  Contribution.belongsTo(User);
  Transaction.hasMany(Contribution);
  Contribution.belongsTo(Transaction);

  await User.sync();
  await Group.sync();
  await UserGroup.sync();

  await Label.sync();
  await UserLabel.sync();
  await GroupLabel.sync();

  await MonthlyLimit.sync();

  await Transaction.sync();
  await Contribution.sync();

  console.log('🚀 We are live on http://localhost:' + port + ' 🚀');
});
