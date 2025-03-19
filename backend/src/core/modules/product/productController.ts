import { Request, Response, NextFunction } from "express";
import productService from "./productService";

const productsController = {
  handleAllProducts: async (req: Request,res: Response,next: NextFunction) => {
    try {
      const data = await productService.getAllProducts(req.params.email);
      res.status(200).json({ message: "Product retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleFeaturedProducts: async (req: Request,res: Response,next: NextFunction) => {
    try {
      const data = await productService.getFeaturedProducts();
      res.status(200).json({ message: "Product retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleGetProductByProductId: async (req: Request,res: Response,next: NextFunction) => {
    try {
      const itemName = req.params.itemName;
      const data = await productService.getProductByProductId(itemName);
      res.status(200).json({ message: "Product retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleGetProductsByProductIdList: async (req: Request,res: Response,next: NextFunction) => {
    try {
      console.log(req.body.itemNames)
      const data = await productService.getProductsByProductIdList(req.body);
      res.status(200).json({ message: "Products retrieved successfully", data: data });
    } catch (error) {
      next(error);
    }
  },
  handleCreateProduct: async function (req: Request,res: Response,next: NextFunction) {
    try {
      await productService.createProduct(req.body);
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  },
  handleUpdateProduct: async function (req: Request,res: Response,next: NextFunction) {
    try {
      await productService.updateProduct(req.params.itemName, req.body);
      res.status(204).json({ message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  },
  handleDeleteProduct: async function (req: Request,res: Response,next: NextFunction) {
    try {
      const id = req.params.itemName;
      await productService.deleteProduct(id);
      res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
export default productsController;
