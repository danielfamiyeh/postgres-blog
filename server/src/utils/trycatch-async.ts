import { Request, Response } from 'express';

export const tryCatchAsync =
  (
    fn: (
      req: Request,
      res: Response
    ) => Promise<void | Response<any, Record<string, any>>>,
    onError?: Function
  ) =>
  (req: Request, res: Response) => {
    fn(req, res).catch((err: Error) => {
      res.status(500).json({ message: 'Internal server error' });
      onError && onError(err);
      console.error(err);
    });
  };
