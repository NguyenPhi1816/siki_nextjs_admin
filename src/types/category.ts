export interface ICategory {
  Id: number;
  Slug: string;
  Name: string;
  Image: string;
  Description: string;
}

export type CategoryByNameResponse = {
  categoryChildrens: ICategory[];
  brands: any;
};

export type CategoryRequest = {
  token: string;
  name: string;
  image: string;
  desc: string;
};

export type UpdateCategoryRequest = {
  token: string;
  id: number;
  name: string;
  image: string;
  desc: string;
};
