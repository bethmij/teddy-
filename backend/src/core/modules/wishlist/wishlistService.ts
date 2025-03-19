import wishlistRepository from "./wishlistRepository";
import mongoose from "mongoose";
import { createError, HttpStatus } from "../../middlewares/customErrorHandler";
import logger from "../../utils/logger";
import userRepository from "../user/userRepository";
import productRepository from "../product/productRepository";

const productService = {
  getWishlistByEmail: async (email: string) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Fetching Product by Email: ${email}`);
      session.startTransaction();

      const user = await userRepository.getUserByEmail(session, email);

      if (!user) {
        logger.warn(`User not found: ${email}`);
        throw createError(HttpStatus.NOT_FOUND, "User not found");
      }

      const wishlist = await wishlistRepository.getFullyDetailedWishlistByUserId(
        session,
        user._id
      );

      if (!wishlist || wishlist.length === 0) {
        logger.warn("No Wishlist found");
        return [];
      }
      await session.commitTransaction();
      logger.info(`Wishlist fetched successfully: ${email}`);
      return wishlist;
    } catch (error) {
      logger.error(`Error fetching Wishlist by Email: ${email}`, {
        error,
      });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  addOrRemoveWishlist: async (wishlistData: any) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Wishlist process start: ${wishlistData.email}`);
      session.startTransaction();
      const user = await userRepository.getUserByEmail(
        session,
        wishlistData.email
      );

      if (!user) {
        logger.warn(`User not found: ${wishlistData.email}`);
        throw createError(HttpStatus.NOT_FOUND, "User not found");
      }

      const productExists = await productRepository.getProductByProductId(
        session,
        wishlistData.item
      );

      if (!productExists) {
        logger.warn(`Product not exists: ${wishlistData.item}`);
        throw createError(HttpStatus.NOT_FOUND, "Product not exists");
      }

      const wishlistExist = await wishlistRepository.getWishlistByUserIdAndItemId(
        session,
        user._id,
        productExists._id
      );

      let newState = "none"
      if (wishlistData.state == true) {
        
        if (!wishlistExist) {
          logger.warn(`wishlist not exists: ${wishlistData.item}`);
          throw createError(HttpStatus.NOT_FOUND, "wishlist not exists to Remove");
        }

        const deletedWishlist = await wishlistRepository.deleteWishlist(
          session,
          productExists._id,
          user._id
        );

        if (!deletedWishlist) {
          logger.error(`Failed to delete Wishlist: ${productExists.itemName}`);
          throw createError(HttpStatus.BAD_REQUEST, "Invalid request data");
        }

        newState = "delete"
      } else {

        if (wishlistExist) {
          logger.warn(`wishlist alredy exists: ${wishlistData.item}`);
          throw createError(HttpStatus.CONFLICT, "wishlist alredy exists to add");
        }

        const createWishlist = await wishlistRepository.createWishlist(
          session,
          {email:user._id,item:productExists._id}
        );

        if (!createWishlist) {
          logger.error("Failed to create Wishlist", {
            wishlistData: wishlistData.itemName,
          });
          throw createError(HttpStatus.BAD_REQUEST, "Invalid input provided");
        }

        newState = "add"
      }

      await session.commitTransaction();
      logger.info(`Wishlist created successfully: ${wishlistData.item}`);

      return newState;

    } catch (error) {
      logger.error(`Error creating Wishlist: ${wishlistData.item}`, {
        error,
      });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
};

export default productService;
