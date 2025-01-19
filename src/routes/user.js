import { Router } from "express";
import { checkSchema } from "express-validator";
import { userSchema } from "../validations/userValidation.js";
import {
  deleteUser,
  getUser,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

//get all users
router.get("/api/users", getUsers);

//get user by id
router.get("/api/users/:id", getUser);

//create user
router.post("/api/users", checkSchema(userSchema), registerUser);

//update user
router.put("/api/users/:id", checkSchema(userSchema), updateUser);

//delete user
router.delete("/api/users/:id", deleteUser);

export default router;
