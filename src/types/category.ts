export interface ICategory {
  id: number;
  image: string;
  name: string;
}

export type CategoryByNameResponse = {
  categoryChildrens: ICategory[];
  brands: any;
};

export type CategoryRequest = {
  name: string;
  image: string;
  desc: string;
  parentId: string | null;
};
