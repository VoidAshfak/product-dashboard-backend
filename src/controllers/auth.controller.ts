import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import type { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken"
import type {
    LoginBody,
    LoginSuccessPayload,
    ResponseUser,
    Tokens,
} from "../types/auth.type.js";
import { user } from "../db/data.js";


const generateAccessAndRefreshToken = (userId: string): Tokens => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15d",
    });
    return { accessToken, refreshToken };
};

const loginUser = async (
    req: Request<{}, ApiResponse<LoginSuccessPayload>, LoginBody>,
    res: Response<ApiResponse<LoginSuccessPayload>>
) => {

    const { email, password } = req.body ?? {};

    if (!email) {
        throw new ApiError(400, "All fields are required");
    } else if (!password) {
        throw new ApiError(400, "All fields are required");
    }

    const isEmailValid = email === user?.email;
    const isPasswordValid = password === "12345678";

    if (!isEmailValid || !isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const responseUser: ResponseUser = {
        id: user?.id,
        email: user?.email,
        role: user?.role,
    };

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(user?.id)

    const options: CookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, { ...options, maxAge: 15 * 60 * 1000 })
        .cookie("refreshToken", refreshToken, { ...options, maxAge: 24 * 60 * 60 * 1000 })
        .json(
            new ApiResponse<LoginSuccessPayload>(
                200,
                {
                    user: responseUser
                },
                "User Logged In Successfully"
            )
        )


}

const refresh = (req: Request, res: Response) => {
    const user = req.user;
    res.json({ user })
}

const logout = (req: Request, res: Response) => {
    return res
        .status(200)
        .cookie("accessToken", null)
        .cookie("refreshToken", null)
        .json(new ApiResponse(200, null, "User Logged Out Successfully"));
}

export {
    loginUser,
    refresh,
    logout
}

