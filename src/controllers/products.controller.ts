import db from "../db/firebaseConfig.js";
import type { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import type { Product } from '../types/products.type.js'

const getProducts = async (
    req: Request,
    res: Response
) => {
    try {
        const snapshot = await db.collection('dashboard').get();
        const products: Product[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Product
            return data
        });
        return res.status(200).json(new ApiResponse(200, products, "Data fetched successfully"));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const createProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, category, price, stock, status, totalSold, totalViews, ratingAvg } = req.body;

        if (!name || !category || price == null || stock == null || !status) {
            throw new ApiError(400, "Missing required product fields");
        }

        const payload = {
            name,
            category,
            price,
            stock,
            status,
            totalSold,
            totalViews, 
            ratingAvg
        };

        const docRef = await db.collection("dashboard").add(payload);

        const createdDoc = await docRef.get();
        const createdData = createdDoc.data() as Omit<Product, "id">;

        const product: Product = {
            id: createdDoc.id,
            ...createdData,
        };

        return res
            .status(201)
            .json(new ApiResponse<Product>(201, product, "Product created successfully"));
    } catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
};


const updateProduct = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, status, totalSold, totalViews, ratingAvg } = req.body;

        const docRef = db.collection("dashboard").doc(id!);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            throw new ApiError(404, "Product not found");
        }

        const updatePayload: Partial<Product> = {
            ...(name !== undefined && { name }),
            ...(category !== undefined && { category }),
            ...(price !== undefined && { price: Number(price) }),
            ...(stock !== undefined && { stock: Number(stock) }),
            ...(status !== undefined && { status }),
            ...(totalSold !== undefined && { totalSold }),
            ...(totalViews !== undefined && { totalViews }),
            ...(ratingAvg !== undefined && { ratingAvg }),
        };

        await docRef.update(updatePayload);

        const updatedDoc = await docRef.get();
        const updatedData = updatedDoc.data() as Omit<Product, "id">;

        const product: Product = {
            id: updatedDoc.id,
            ...updatedData,
        };

        return res
            .status(200)
            .json(new ApiResponse<Product>(200, product, "Product updated successfully"));
    } catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null> | { message: string }>
) => {
  try {
    const { id } = req.params;

    const docRef = db.collection("dashboard").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new ApiError(404, "Product not found");
    }

    await docRef.delete();

    return res
      .status(200)
      .json(new ApiResponse<null>(200, null, "Product deleted successfully"));
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}