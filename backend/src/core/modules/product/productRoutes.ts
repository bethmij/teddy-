import express from "express";
var router = express.Router();
import productController from "./productController";
import validate from "../../middlewares/validate";
import { getProduct,deleteProduct } from "./productSchema";

router.get('/all/:email', productController.handleAllProducts);
router.get('/featured/items', productController.handleFeaturedProducts);
router.get('/:itemName',validate(getProduct), productController.handleGetProductByProductId);
router.post('/cart/items', productController.handleGetProductsByProductIdList);
router.post('/', productController.handleCreateProduct);
router.put('/:itemName', productController.handleUpdateProduct);
router.delete('/:itemName',validate(deleteProduct), productController.handleDeleteProduct);

export default router;
