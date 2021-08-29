import { Category } from './category.model';

export interface Car{
  id: string;
  mark: string;
  model: string;
  placeNumber: number;
  registration: string;
  image: string;
  status: string;
  category: Category;
}
