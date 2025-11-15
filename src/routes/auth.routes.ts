import { Router } from "express";
import { loginUser, refresh } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/me").get(verifyJWT, refresh);

export default router;