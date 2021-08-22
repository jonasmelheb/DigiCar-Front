import { Category } from "./category.model";
import { User } from "./user.model";

export interface CarForCarRental {
  id: number;
  mark: string;
  model: string;
  placeNumber: number;
  registration: string;
  image: string;
  status: string;
  category: Category;
  user: User;
  carService: boolean;
}
