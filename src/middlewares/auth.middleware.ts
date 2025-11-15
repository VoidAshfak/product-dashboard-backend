import { ApiError } from "../utils/ApiError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { LoginSuccessPayload, LoginBody } from "../types/auth.type.js";
import { user } from "../db/data.js";
import type { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

declare module "express-serve-static-core" {
    interface Request {
        user?: LoginSuccessPayload["user"];
    }
}

interface JwtUserPayload extends JwtPayload {
    userId: string;
}

export const verifyJWT = (
    req: Request<{}, ApiResponse<LoginSuccessPayload>, LoginBody>,
    _res: Response<ApiResponse<LoginSuccessPayload>>,
    next: NextFunction
): void => {
    try {
        const token = req.cookies?.accessToken;
            
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new Error("ACCESS_TOKEN_SECRET is not set");
        }

        const { userId } = jwt.verify(token, secret) as JwtUserPayload;
    
        if (!userId || userId !== user.id) {
            throw new ApiError(401, "Unauthorized request");
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        next();
    } catch (err) {
        console.error("verifyJWT error:", err);
        if (err instanceof ApiError) {
            return next(err);
        }
        return next(new ApiError(401, "Invalid access token"));
    }
};


