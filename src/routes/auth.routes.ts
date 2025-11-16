import { Router } from "express";
import { loginUser, refresh, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/me").get(refresh);
router.route("/logout").post(verifyJWT, logout);

export default router;