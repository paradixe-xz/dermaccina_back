import { Request, Response, NextFunction } from 'express';
import { ResponseHelper } from '../helpers/responseHelper';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  return ResponseHelper.error(res, err.message || 'Internal Server Error', 500);
};