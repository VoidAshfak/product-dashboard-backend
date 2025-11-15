import type { ResponseUser } from "../types/auth.type.js";
import type { Product } from "../types/products.type.js";

export class ApiResponse<T = Product | ResponseUser> {
  public readonly statusCode: number;
  public readonly data: T;
  public readonly message: string;
  public readonly success: boolean;

  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}