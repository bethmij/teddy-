import productRepository from "./productRepository";
import wishlistRepository from "../wishlist/wishlistRepository";
import userRepository from "../user/userRepository";
import mongoose from "mongoose";
import { createError, HttpStatus } from "../../middlewares/customErrorHandler";
import logger from "../../utils/logger";

const productService = {
  getAllProducts: async (email:string) => {
    logger.info("Fetching all Products");
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const products = await productRepository.getAllProducts(session);
      if (!products || products.length === 0) {
        logger.warn("No Products found");
        return [];
      }

      const user = await userRepository.getUserByEmail(session, email);

      if (user) {
      
        const wishlist = await wishlistRepository.getWishlistByUserId(
          session,
          user._id
        );

        const wishlistSet = new Set(wishlist.map(w => w.item.toString()));

        const updatedProducts = products.map((product:any) => ({
            ...product.toObject(),
            isInWishlist: wishlistSet.has(product._id.toString()),
        }));

        await session.commitTransaction();
        logger.info(`Filterd with wishlist Products Fetched ${products.length} Product`);
        return updatedProducts
      } 
      await session.commitTransaction();
      logger.info(`Fetched ${products.length} Product`);
      return products;
    } catch (error) {
      logger.error("Error fetching all Product", { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
  getFeaturedProducts: async () => {
    logger.info("Fetching Featured Products");
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const product = await productRepository.getFeaturedProducts(session);
      if (!product || product.length === 0) {
        logger.warn("No Products found");
        return [];
      }
      await session.commitTransaction();
      logger.info(`Fetched ${product.length} Product`);
      return product;
    } catch (error) {
      logger.error("Error fetching Featured Product", { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  getProductByProductId: async (itemName: string) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Fetching Product by ProductId: ${itemName}`);
      session.startTransaction();
      const product = await productRepository.getProductByProductId(session, itemName);

      if (!product) {
        logger.warn(`Product not found: ${itemName}`);
        throw createError(HttpStatus.NOT_FOUND, "Product not found");
      }
      await session.commitTransaction();
      logger.info(`Product fetched successfully: ${itemName}`);
      return product;
    } catch (error) {
      logger.error(`Error fetching Product by ProductId: ${itemName}`, { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  getProductsByProductIdList: async (data: any) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Fetching Products by ProductIdList: ${data}`);
      session.startTransaction();
      const product = await productRepository.getProductsByProductIdList(session, data.itemNames);
      
      if (!product) {
        logger.warn(`Products not found: ${data}`);
        throw createError(HttpStatus.NOT_FOUND, "Products not found");
      }
      await session.commitTransaction();
      logger.info(`Products fetched successfully: ${data}`);
      return product;
    } catch (error) {
      logger.error(`Error fetching Products by ProductIdList: ${data}`, { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  createProduct: async (productData: any) => {
    const session = await mongoose.startSession();
    let isTransactionCommitted = false;
    try {
      logger.info(`Creating Product: ${productData.itemName}`);
      session.startTransaction();
      const productExists = await productRepository.getProductByProductId(
        session,
        productData.itemName
      );

      if (productExists) {
        logger.warn(`Product already exists: ${productData.itemName}`);
        throw createError(HttpStatus.CONFLICT, "Product already exists");
      }

      const createProduct = await productRepository.createProduct(session,productData);

      if (!createProduct) {
        logger.error("Failed to create Product", { productData: productData.itemName });
        throw createError(HttpStatus.BAD_REQUEST, "Invalid input provided");
      }
      await session.commitTransaction();
      logger.info(`Product created successfully: ${productData.itemName}`);
    } catch (error) {
      logger.error(`Error creating Product: ${productData.itemName}`, { error });
      if (!isTransactionCommitted) {
        await session.abortTransaction();
      }
      throw error;
    }finally {
      session.endSession();
    }
  },
  updateProduct: async (itemName: string, productData: any) => {
    const session = await mongoose.startSession();
    logger.info(`Updating Product: ${itemName}`);
    try {
      session.startTransaction();

      const productExists = await productRepository.getProductByProductId(session,itemName);

      if (!productExists) {
        logger.warn(`Product not found: ${itemName}`);
        throw createError(HttpStatus.NOT_FOUND, "Product not found");
      }
      const updatedProduct = await productRepository.updateProduct(session, productData);

      if (!updatedProduct) {
        logger.error("Failed to update Product", { itemName: itemName });
        throw createError(HttpStatus.BAD_REQUEST, "Invalid request data");
      }
      await session.commitTransaction();
      logger.info(`Product updated successfully: ${itemName}`);
    } catch (error) {
      logger.error(`Error updating Product: ${itemName}`, { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  deleteProduct: async (itemName: string) => {
    logger.info(`Deleting Product: ${itemName}`);
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const productExists = await productRepository.getProductByProductId(session,itemName);

      if (!productExists) {
        logger.warn(`Product not found: ${itemName}`);
        throw createError(HttpStatus.NOT_FOUND, "Product not found");
      }
      const deletedProduct = await productRepository.deleteProduct(session, itemName);

      if (!deletedProduct) {
        logger.error(`Failed to delete Product: ${itemName}`);
        throw createError(HttpStatus.BAD_REQUEST, "Invalid request data");
      }
      await session.commitTransaction();
      logger.info(`Product deleted successfully: ${itemName}`);
    } catch (error) {
      logger.error(`Error delete Product: ${itemName}`, { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
};

export default productService;
