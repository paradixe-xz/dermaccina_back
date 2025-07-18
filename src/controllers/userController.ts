// import { Request, Response, NextFunction } from 'express';
// import { UserModel } from '../models/User';
// import { ResponseHelper } from '../helpers/responseHelper';
// import { CreateUserRequest } from '../interface/User';

// export class UserController {
//   static async getUsers(req: Request, res: Response, next: NextFunction) {
//     try {
//       const users = await UserModel.getAll();
//       return ResponseHelper.success(res, users, 'Users retrieved successfully');
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async getUserById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = req.params;
//       const user = await UserModel.getById(id);
      
//       if (!user) {
//         return ResponseHelper.error(res, 'User not found', 404);
//       }
      
//       return ResponseHelper.success(res, user, 'User retrieved successfully');
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async createUser(req: Request, res: Response, next: NextFunction) {
//     try {
//       const userData: CreateUserRequest = req.body;
//       const newUser = await UserModel.create(userData);
//       return ResponseHelper.success(res, newUser, 'User created successfully');
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async helloWorld(req: Request, res: Response) {
//     return ResponseHelper.success(res, { message: 'Hello World from Dermaccina API!' }, 'Welcome to the API');
//   }
// }