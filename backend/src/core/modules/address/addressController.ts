import { Request, Response, NextFunction } from "express";
import addressService from "./addressService";

const addressController = {
  handleGetAddresByUserId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const data = await addressService.getAllAddressByUserId(userId);
      res.status(200).json({ message: "Address retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleCreateAddress: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await addressService.createAddress(req.body);
      res.status(201).json({ message: "Address created successfully" });
    } catch (error) {
      next(error);
    }
  },
  handleUpdateAddress: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await addressService.updateAddress(req.body);
      res.status(204).json({ message: "Address updated successfully" });
    } catch (error) {
      next(error);
    }
  },
};
export default addressController;
