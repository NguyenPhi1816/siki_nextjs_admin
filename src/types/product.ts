export interface IProduct {
  Id: number;
  Slug: string;
  Name: string;
  Description: string;
  CategoryId: string;
  Status: string;
  image: string;
}

export interface ProductOptionValuesRequest {
  name: string;
  values: string[];
}

export interface ProductOptionValueRequest {
  option: string;
  value: string;
}

export interface ProductVariantRequest {
  price: number;
  quantity: number;
  image: string;
  optionValues: ProductOptionValueRequest[];
}

export interface AddProductRequest {
  token: string;
  name: string;
  description: string;
  categoryId: number;
  images: string[];
  options: ProductOptionValuesRequest[];
  variants: ProductVariantRequest[];
}
