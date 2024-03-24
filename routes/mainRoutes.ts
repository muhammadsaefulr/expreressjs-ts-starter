import express from "express";

import UserController from "../controllers/mainController";
import { jwtAuth } from "../middleware/middleware";

const router = express.Router();

router.get("/users", jwtAuth, UserController.getAllUsers);
router.post("/users/auth", UserController.authLoginUser);
router.post("/users", UserController.createUsers);
router.delete("/users/:id", UserController.deleteUser);

export default router;
