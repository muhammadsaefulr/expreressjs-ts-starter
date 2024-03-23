import express from "express";

import UserController from "../controllers/mainController";
import { validateUser } from "../middleware/middleware";

const router = express.Router()

router.get("/users", UserController.getAllUsers)
router.post("/users", UserController.createUsers)

export default router