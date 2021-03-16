import express, { Response, Request } from 'express';
import { MyError } from './error/error';
import reportRoutes from './reports/routes';

const app = express();
const port = 3000;

app.use(reportRoutes);

/**
 * Asume arity of 4 means error occurred
 */
app.use((err: MyError, _req: Request, res: Response, _next: Function) => {
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
