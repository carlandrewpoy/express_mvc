import { Router } from "express"
import jwt from "jsonwebtoken"
import {
  register,
  login,
  getUsers,
  logout,
} from "../controllers/authController.js"
import { verifyUser } from "../middleware/verifyUser.js"

const router = Router()

router.get("/", getUsers)
router.post("/register", register)
router.post("/login", login)
router.delete("/logout", verifyUser, logout)

export default router
