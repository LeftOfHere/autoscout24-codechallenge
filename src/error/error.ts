export const error = (status: number, msg: string) => {
  var err = new MyError(msg);
  err.status = status;
  return err;
}

export class MyError extends Error {
  status: number;

  constructor(msg: string) {
    super(msg);
  }
}