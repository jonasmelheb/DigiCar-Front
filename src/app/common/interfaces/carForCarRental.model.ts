import { ECategory } from "./Ecategory";
import { User } from "./user.model";

export interface CarForCarRental {
  id: number;
  mark: string;
  model: string;
  placeNumber: number;
  registration: string;
  image: string;
  status: string;
  category: ECategory;
  user: User;
  carService: boolean;
}
