import express from "express";
var router = express.Router();
import wishlistController from "./wishlistController";

router.get("/:email", wishlistController.handleGetWishlistByEmail);
router.post("/", wishlistController.handleAddOrRemoveWishlist);

export default router;
