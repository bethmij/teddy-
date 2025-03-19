import { Request, Response, NextFunction } from "express";
import orderService from "./orderService";

const orderController = {
  handleAllOrders: async (req: Request,res: Response,next: NextFunction) => {
    try {
      const data = await orderService.getAllOrders();
      res.status(200).json({ message: "Orders retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleOrdersByEmail: async (req: Request,res: Response,next: NextFunction) => {
    try {
      const data = await orderService.getOrdersByEmail(req.params.email);
      res.status(200).json({ message: "Orders retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleCreateOrder: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await orderService.createOrder(req.body);
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      next(error);
    }
  },
};
export default orderController;
