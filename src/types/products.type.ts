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
  stock: number;
  totalSold: number;
  totalViews: number;
  ratingAvg: number;
  status: ProductStatus;
}