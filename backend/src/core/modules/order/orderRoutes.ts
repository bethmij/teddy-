import express from "express";
var router = express.Router();
import orderController from "./orderController";

router.get('/', orderController.handleAllOrders);
router.get('/:email', orderController.handleOrdersByEmail);
router.post('/', orderController.handleCreateOrder);

export default router;
