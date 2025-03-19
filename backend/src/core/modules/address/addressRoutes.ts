import express from "express";
var router = express.Router();
import addressController from "./addressController";

router.get("/:userId", addressController.handleGetAddresByUserId);
router.post("/", addressController.handleCreateAddress);
router.put("/", addressController.handleUpdateAddress);

export default router;
