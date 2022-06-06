import express from 'express';
import image from './routes/api/img';

const app = express();
const port: number = 3000;

app.use('/api', image);

if (!module.parent) {
  app.listen(port, (): void => console.log(`Server working on port ${port}!`));
}

export default app;
