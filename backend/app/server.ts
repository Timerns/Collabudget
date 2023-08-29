import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';

config();
const app = express();
const port = 8000;

app.listen(port, async () => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World ' + process.env.HELLO);
  });
  
  console.log('🚀 We are live on http://localhost:' + port + ' 🚀');
});
