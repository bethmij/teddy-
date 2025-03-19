import express from "express";
var router = express.Router();
import userController from "./userController";
import validate from "../../middlewares/validate";
import { getUser,deleteUser } from "./userSchema";

router.get('/', userController.handleAllUsers);
router.get('/filterd/all', userController.handleAllFilterdUsers);
router.get('/:email',validate(getUser), userController.handleGetUserByUsername);
router.post('/', userController.handleCreateUser);
router.put('/:email', userController.handleUpdateUser);
router.delete('/:email',validate(deleteUser), userController.handleDeleteUser);

export default router;
