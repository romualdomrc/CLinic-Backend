import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  login,
  logout,
  homePage,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authJwt.js";

const authRouter = Router();

authRouter.get("/", homePage);
authRouter.get("/users", requireAuth, getAllUsers);
authRouter.get("/users/:id", requireAuth, getUserById);
authRouter.post("/users", requireAuth, createUser);
authRouter.post("/login", login);
authRouter.get("/logout", requireAuth, logout);

authRouter.get("/secret-page", requireAuth, (req, res) =>
  res.json({ message: "Confidential file" })
);

export default authRouter;
