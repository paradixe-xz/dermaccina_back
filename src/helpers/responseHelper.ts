import { Response } from 'express';
import { ApiResponse } from '../interface/init';

export class ResponseHelper {
  static success<T>(res: Response, data: T, message: string = 'Success'): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data
    };
    return res.status(200).json(response);
  }

  static error(res: Response, message: string, statusCode: number = 500): Response {
    const response: ApiResponse<null> = {
      success: false,
      message,
      error: message
    };
    return res.status(statusCode).json(response);
  }
}