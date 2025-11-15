export type ProductStatus = "active" | "inactive" | "archived";

export type ProductCategory =
  | "Streaming Plan"
  | "Add-on"
  | "GPU Instance"
  | "Storage";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;

  price: number;
  currency: "USD" | "EUR" | "BDT";

  status: ProductStatus;
  stock: number;

  totalSold: number;
  totalViews: number;
  ratingAvg: number;
}

export interface ProductPayload extends Omit<Product, 
    "id" 
    | "totalSold" 
    | "totalViews" 
    | "ratingAvg" 
    | "currency"
    | "ratingCount"> {}