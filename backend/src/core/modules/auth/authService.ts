import * as jwtUtils from "../../utils/jwtUtils";
import bcrypt from 'bcrypt';
import { Response } from "express";
import logger from '../../utils/logger';
import userRepository from "../user/userRepository";
import mongoose from "mongoose";
import { createError, HttpStatus } from "../../middlewares/customErrorHandler";

const authService = {
  
  signIn : async (email: string, password: string, res: Response ) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Attempting to sign in user: ${email}`);

     const user = await userRepository.getUserByEmail(session,email);
    if (!user) {
      logger.warn(`Sign-in failed: User not found for email: ${email}`);
      throw createError(HttpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Sign-in failed: Invalid password for email: ${email}`);
      throw createError(HttpStatus.BAD_REQUEST, "Invalid password");
    }

    const accessToken = jwtUtils.generateAccessToken({ email: user.email, role: user.role });
    const refreshToken = jwtUtils.generateRefreshToken({ email: user.email, role: user.role });

    logger.info(`Generated tokens for user: ${email}`);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    logger.info(`Refresh token set in cookie for user: ${email}`);
    return { accessToken, user: { email: user.email, role: user.role , name:user.name} };
    } catch (error) {
      logger.error(`Sign-in failed for username: ${email}`, { error });
      throw error
    }
  },
  refreshToken : async (token: string) => {
    try {
      logger.info(`Attempting to refresh access token`);

      if (!token) {
        logger.warn(`Refresh token not provided`);
        throw createError(HttpStatus.BAD_REQUEST, "Refresh token not provided");
      }
      const payload = jwtUtils.verifyRefreshToken(token);
      logger.info(`Access token refreshed for user: ${payload.email}${payload.role}`);
      return jwtUtils.generateAccessToken({ email: payload.email, role: payload.role });
      
    } catch (error) {
      logger.error(`Access token refreshed failed for email: ${token}`, { error });
      throw error
    }
  }
}

export default authService;
