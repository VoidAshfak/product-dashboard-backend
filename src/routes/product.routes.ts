import { Router } from "express";
import { getProducts, createProduct,updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// Protected routes
// router.use(verifyJWT);
router.route("/all").get(getProducts);
router.route("/create").post(createProduct);
router.route("/update/:id").put(updateProduct);
router.route("/delete/:id").delete(deleteProduct);

export default router;