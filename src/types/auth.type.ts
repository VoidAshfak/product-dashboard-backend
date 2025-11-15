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

interface ResponseUser {
    id: string;
    email: string;
    role: "admin" | "user";
}

interface LoginSuccessPayload {
    user: ResponseUser;
}


export type { LoginBody, Tokens, User, ResponseUser, LoginSuccessPayload };