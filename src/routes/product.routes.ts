import { Router } from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// Protected routes
// router.use(verifyJWT);
router.route("/all").get(verifyJWT, getProducts);
router.route("/create").post(verifyJWT, createProduct);
router.route("/update/:id").put(verifyJWT, updateProduct);
router.route("/delete/:id").delete(verifyJWT, deleteProduct);

export default router;