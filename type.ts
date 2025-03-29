// File: type.ts

export interface ISize {
  name: string;
  price: number;
  originalPrice?: number | null;
  inStock: boolean;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image?: string;
  category?: string;
  sizes?: ISize[];
  colors?: string[];
  rating?: number;
  reviews?: number;
  quantity?:number;
}
  