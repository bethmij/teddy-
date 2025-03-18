
import { Request, Response } from 'express';
import authService from './authService';

const authController = {
  handleRefreshToken: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.refreshToken;
      const newToken = await authService.refreshToken(token);
  
      res.status(200).json({
        message: 'Token refreshed successfully',
        token: newToken,
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
  handleSignIn: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const { user, accessToken } = await authService.signIn(username, password, res);
      res.status(200).json({ message: 'User signIn successfully', data:{username:user.username,name:user.name,role:user.role,token:accessToken} });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
  handleLogOut: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}
export default authController;