import express, { Express, Request, Response } from 'express';

const app = express();
const port = 8000;

app.listen(port, async () => {
  
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
  
  console.log('🚀 We are live on http://localhost:' + port + '🚀');
});
