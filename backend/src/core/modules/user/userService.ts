import userRepository from './userRepository';
import mongoose from 'mongoose';
import { createError, HttpStatus } from '../../middlewares/customErrorHandler';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger';
import * as jwtUtils from "../../utils/jwtUtils";
import { Response } from "express";

const userService = {
  getAllUsers: async () => {
    logger.info("Fetching all users");
    const session = await mongoose.startSession();
   try{
        session.startTransaction();
        const users = await userRepository.getAllUsers(session);
        if (!users || users.length === 0) {
          logger.warn("No users found");
          return [];
        }
        await session.commitTransaction();
        logger.info(`Fetched ${users.length} users`);
        return users;
    }catch(error){
        logger.error("Error fetching all users", { error });
        await session.abortTransaction();
        throw error;
    }
    finally {
      session.endSession();
    }
  },
  getAllFilterdUsers: async () => {
    logger.info("Fetching all Filterd users");
    const session = await mongoose.startSession();
   try{
        session.startTransaction();
        const users = await userRepository.getAllFilterdUsers(session);
        if (!users || users.length === 0) {
          logger.warn("No users found");
          return [];
        }
        await session.commitTransaction();
        logger.info(`Fetched ${users.length} users`);
        return users;
    }catch(error){
        logger.error("Error fetching all Filterd users", { error });
        await session.abortTransaction();
        throw error;
    }
    finally {
      session.endSession();
    }
  },

  getUserByUsername: async (email: string) => {
    const session = await mongoose.startSession();
    try{
        logger.info(`Fetching user by username: ${email}`);
        session.startTransaction();
        const user = await userRepository.getUserByEmail(session, email);

        if (!user) {
          logger.warn(`User not found: ${email}`);
          throw createError(HttpStatus.NOT_FOUND, "User not found");
        }
        await session.commitTransaction();
        logger.info(`User fetched successfully: ${email}`);
        return user;
        
    }catch(error){
      logger.error(`Error fetching user by username: ${email}`, { error });
      await session.abortTransaction();
      throw error;
    }finally {
      session.endSession();
    }
  },

  createUser: async (userData: any, res: Response) => {
    const session = await mongoose.startSession();
    try {
        logger.info(`Creating user: ${userData.email}`);
          session.startTransaction();
          const userExists = await userRepository.getUserByEmail(session, userData.email);
  
          if (userExists) {
            logger.warn(`User already exists: ${userData.email}`);
            throw createError(HttpStatus.CONFLICT, "User already exists");
          }
          const bcryptedPassword = await bcrypt.hash(userData.password, 10);

          userData.password = bcryptedPassword
          userData.role = "USER"

          const createUser = await userRepository.createUser(session, userData);

          if(!createUser){
              logger.error('Failed to create user', { userData });
              throw createError(HttpStatus.BAD_REQUEST, "Invalid input provided");
          }

          const accessToken = jwtUtils.generateAccessToken({ email: userData.email, role: userData.role });
          const refreshToken = jwtUtils.generateRefreshToken({ email: userData.email });
      
          logger.info(`Generated tokens for user: ${userData.email}`);
      
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
          });
          logger.info(`Refresh token set in cookie for user: ${userData.email}`);
          return { accessToken, user: { email: userData.email, role: userData.role , name:userData.name} };

          await session.commitTransaction();
          logger.info(`User created successfully: ${userData.email}`);
       
      } catch (error) {
        logger.error(`Error creating user: ${userData.email}`, {error});
        await session.abortTransaction();
        throw error;
      }finally {
        session.endSession();
      }
  },
  updateUser: async (email: string, userData: any) => {
    const session = await mongoose.startSession();
    logger.info(`Updating user: ${email}`);
    try {
        session.startTransaction();

        const userExists = await userRepository.getUserByEmail(session, email);
  
          if (!userExists) {
            logger.warn(`User not found: ${email}`);
            throw createError(HttpStatus.NOT_FOUND, "User not found");
          }
          
          const compair = await bcrypt.compare(userData.password, userExists.password);
              if (!compair) {
                const bcryptedPassword = await bcrypt.hash(userData.password, 10);
                userData.password = bcryptedPassword;
              }else{
                userData.password = userExists.password;
              }
              
            const updatedUser = await userRepository.updateUser(session, userData );

          if(!updatedUser){
            logger.error('Failed to update user', { email });
            throw createError(HttpStatus.BAD_REQUEST, "Invalid request data");
          }
          await session.commitTransaction();
          logger.info(`User updated successfully: ${email}`);
      } catch (error) {
        logger.error(`Error updating user: ${email}`, { error });
        await session.abortTransaction();
        throw error;
      }finally {
        session.endSession();
      }
  },

  deleteUser: async (email: string) => {
    logger.info(`Deleting user: ${email}`);
    const session = await mongoose.startSession();
    try {
          session.startTransaction();
          const userExists = await userRepository.getUserByEmail(session, email);
  
          if (!userExists) {
            logger.warn(`User not found: ${email}`);
            throw createError(HttpStatus.NOT_FOUND, "User not found");
          }
          const deletedUser = await userRepository.deleteUser(session,email);

        if(!deletedUser){
          logger.error(`Failed to delete user: ${email}`);
          throw createError(HttpStatus.BAD_REQUEST, "Invalid request data");
        }
        await session.commitTransaction();
        logger.info(`User deleted successfully: ${email}`);
   
    } catch (error) {
      logger.error(`Error deleteUser user: ${email}`, { error });
      await session.abortTransaction();
      throw error;
    }
    finally {
      session.endSession();
    }
  }
    
};

export default userService;
