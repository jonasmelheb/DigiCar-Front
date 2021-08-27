import { ECategory } from "./Ecategory";

export interface CarForCarRentalDetails{
  id: number;
  image: string;
  mark: string;
  model: string;
  placeNumber: number;
  registration: string;
  status: string;
  category: ECategory;
}
