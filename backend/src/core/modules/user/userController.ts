import { Request, Response, NextFunction } from 'express';
import userService from './userService';

const userController = {
  handleAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.getAllUsers();
      res.status(200).json({ message: "Users retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleAllFilterdUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.getAllFilterdUsers();
      res.status(200).json({ message: "Users retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleGetUserByUsername: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.params.email;
      const data = await userService.getUserByUsername(username);
      res.status(200).json({ message: "User retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleCreateUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken } = await userService.createUser(req.body,res);
      res.status(201).json({ message: "User created successfully" , data:{email:user.email, name:user.name, role:user.role, token:accessToken} });
    } catch (error) {
      next(error);
    }
  },
  handleUpdateUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      await userService.updateUser(req.params.email, req.body);
      res.status(204).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  },
  handleDeleteUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.email;
      await userService.deleteUser(id);
      res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
}
export default userController;