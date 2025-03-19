import { createError, HttpStatus } from "../../middlewares/customErrorHandler";
import logger from "../../utils/logger";
import orderRepository from "./orderRepository";
import userRepository from "../user/userRepository";
import productRepository from "../product/productRepository";
import mongoose, { Types } from "mongoose";
import { Order, OrderDetail } from "../../database/schemas/mongodbSchemas";
const orderService = {
  getAllOrders: async () => {
    logger.info("Fetching all Orders");
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const product = await orderRepository.getAllOrders(session);
      if (!product || product.length === 0) {
        logger.warn("No Orders found");
        return [];
      }
      await session.commitTransaction();
      logger.info(`Fetched ${product.length} Orders`);
      return product;
    } catch (error) {
      logger.error("Error fetching all Orders", { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
  getOrdersByEmail: async (email: string) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Fetching Orders by Email: ${email}`);
      session.startTransaction();

      const user = await userRepository.getUserByEmail(
        session,
        email
      );

      if (!user) {
        logger.warn(`User not found: ${email}`);
        throw createError(HttpStatus.NOT_FOUND, "User not found");
      }

      const orders = await orderRepository.getOrderstByEmail(session, user._id);

      if (!orders) {
        logger.warn(`Orders not found: ${email}`);
        throw createError(HttpStatus.NOT_FOUND, "Orders not found");
      }
      await session.commitTransaction();
      logger.info(`Orders fetched successfully: ${email}`);
      return orders;
    } catch (error) {
      logger.error(`Error fetching Orders by email: ${email}`, { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
  createOrder: async (orderData: any) => {
    const session = await mongoose.startSession();
    try {
      logger.info(`Creating Order: ${orderData.userId}`);
      session.startTransaction();
      const user = await userRepository.getUserByEmail(
        session,
        orderData.userId
      );

      if (!user) {
        logger.warn(`User not found: ${orderData.userId}`);
        throw createError(HttpStatus.NOT_FOUND, "User not found");
      }

      const order = await orderRepository.createOrder(user, orderData);

      const savedOrder = await order.save({ session });

      const orderDetails: any = [];
      for (const item of orderData.orderDetails) {
        const orderDetail = await orderRepository.createOrderDetails(
          savedOrder,
          item
        );

        await orderDetail.save({ session });
        orderDetails.push(orderDetail._id);
      }

      savedOrder.orderDetails = orderDetails;
      await savedOrder.save({ session });

      await productRepository.updateStock(session, orderData.orderDetails);

      await session.commitTransaction();
      logger.info(`Order created successfully: ${orderData.itemName}`);
    } catch (error) {
      logger.error(`Error creating Order: ${orderData.userId}`, { error });
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
};

export default orderService;
