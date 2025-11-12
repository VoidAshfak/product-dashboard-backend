export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly success: false = false;
    public readonly errors: unknown[];
    public readonly data: null = null;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: unknown[] = [],
        stack: string = ""
    ) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errors = errors;

        Object.setPrototypeOf(this, new.target.prototype);

        if (stack) {
            this.stack = stack;
        } else {
            (Error as any).captureStackTrace?.(this, this.constructor);
        }
    }
}