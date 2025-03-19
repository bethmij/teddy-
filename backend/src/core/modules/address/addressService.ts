import addressRepository from "./addressRepository";
import mongoose from "mongoose";
import { createError, HttpStatus } from "../../middlewares/customErrorHandler";
import logger from "../../utils/logger";

const addressService = {

  getAllAddressByUserId: async (userId: string) => {
    const session = await mongoose.startSession();
    try{
        logger.info(`Fetching Address by userId: ${userId}`);
        session.startTransaction();
        const address = await addressRepository.getAllAddressByUserId(session, userId);

        if (!address) {
          logger.warn(`User not found: ${userId}`);
          throw createError(HttpStatus.NOT_FOUND, "Address not found");
        }
        await session.commitTransaction();
        logger.info(`Address fetched successfully: ${userId}`);
        return address;
        
    }catch(error){
      logger.error(`Error fetching user by userId: ${userId}`, { error });
      await session.abortTransaction();
      throw error;
    }finally {
      session.endSession();
    }
  },
  createAddress: async (data: any) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Creating Address: ${data.userId}`);
      session.startTransaction();
      
      const createAddress = await addressRepository.createAddress(
        session,
        data
      );

      if (!createAddress) {
        logger.error("Failed to create Address", { data });
        throw createError(HttpStatus.BAD_REQUEST, "Invalid input provided");
      }
      await session.commitTransaction();
      logger.info(`Address created successfully: ${data.userId}`);
    } catch (error) {
      logger.error(`Error creating Address: ${data.userId}`, { error });
      await session.abortTransaction();
      throw error;
    }finally {
      session.endSession();
    }
  },
  updateAddress: async (data: any) => {
    const session = await mongoose.startSession();
    logger.info(`Updating Address: ${data._id}`);
    try {
      session.startTransaction();

      const addressExists = await addressRepository.getAddressById(session, data._id);

      if (!addressExists) {
        logger.warn(`Address not found: ${data._id}`);
        throw createError(HttpStatus.NOT_FOUND, "Address not found");
      }

      const updatedAddress = await addressRepository.updateAddress(
        session,
        data
      );

      if (!updatedAddress) {
        logger.error("Failed to update Address", { data });
        throw createError(HttpStatus.BAD_REQUEST, "Invalid request data");
      }
      await session.commitTransaction();
      logger.info(`Address updated successfully: ${data._id}`);
    } catch (error) {
      logger.error(`Error updating Address: ${data._id}`, { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
};

export default addressService;
