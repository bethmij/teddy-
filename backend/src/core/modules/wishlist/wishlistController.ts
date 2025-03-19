import { Request, Response, NextFunction } from "express";
import wishlistService from "./wishlistService";

const wishlistController = {
  
  handleGetWishlistByEmail: async (req: Request,res: Response,next: NextFunction) => {
    try {
      const email = req.params.email;
      const data = await wishlistService.getWishlistByEmail(email);
      res.status(200).json({ message: "Products retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleAddOrRemoveWishlist: async function (req: Request,res: Response,next: NextFunction) {
    try {
      const state = await wishlistService.addOrRemoveWishlist(req.body);
      if (state == "add") {
        res.status(201).json({ message: "Product added to wishlist successfully" });
      } else if (state == "delete"){
        res.status(200).json({ message: "Product removed from wishlist successfully" });
      } else {
        res.status(400).json({ message: "Invalid Data" });
      }
    } catch (error) {
      next(error);
    }
  }
};
export default wishlistController;
