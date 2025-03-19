import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: err.errors.map((e: any) => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  } else if (err.statusCode) {
   
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  } else {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal server error',
      error: 'Unexpected error occurred'
    });
  }
};

export default errorHandler;
