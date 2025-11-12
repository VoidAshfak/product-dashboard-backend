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

export const verifyJWT = async (
    req: Request<{}, ApiResponse<LoginSuccessPayload>, LoginBody>,
    _res: Response<ApiResponse<LoginSuccessPayload>>,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies?.accessToken as string | undefined;
        if (!token) {
            return next(new ApiError(401, "Unauthorized request"));
        }

        const secret = process.env.ACCESS_TOKEN_SECRET!;

        let decoded: string | JwtPayload;
        try {
            decoded = jwt.verify(token, secret);
        } catch {
            return next(new ApiError(401, "Invalid access token"));
        }

        const userId =
            typeof decoded === "string"
                ? (() => {
                    try {
                        const parsed = JSON.parse(decoded) as Partial<JwtPayload> & { userId?: string };
                        return parsed.userId;
                    } catch {
                        return undefined;
                    }
                })()
                : (decoded as JwtPayload & { userId?: string }).userId;

        if (!userId) {
            return next(new ApiError(401, "Invalid access token payload"));
        }

        if (userId !== user.id) {
            return next(new ApiError(401, "Unauthorized request"));
        }

        const responseUser: LoginSuccessPayload["user"] = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        req.user = responseUser;
        return next();

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Invalid access token";
        return next(new ApiError(401, message));
    }
};
