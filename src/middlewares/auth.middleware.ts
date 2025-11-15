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
    const rawToken = req.cookies?.accessToken;

    if (!rawToken) {
        return next(new ApiError(401, "Unauthorized request"));
    }

    // In case something stored "Bearer <token>" in the cookie
    const token = rawToken.startsWith("Bearer ")
        ? rawToken.slice(7)
        : rawToken;

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        return next(new Error("ACCESS_TOKEN_SECRET is not set"));
    }

    try {
        const { userId } = jwt.verify(token, secret) as JwtUserPayload;

        if (!userId || userId !== user.id) {
            return next(new ApiError(401, "Unauthorized request"));
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        return next();
    } catch (err) {
        console.error("verifyJWT error:", err);
        return next(new ApiError(401, "Invalid access token"));
    }
};



