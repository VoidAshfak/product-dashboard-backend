interface LoginBody {
    email: string;
    password: string;
}
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
interface User {
    id: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

interface responseUser {
    id: string;
    email: string;
    role: "admin" | "user";
}

interface LoginSuccessPayload {
    user: responseUser;
}


export type { LoginBody, Tokens, User, responseUser, LoginSuccessPayload };