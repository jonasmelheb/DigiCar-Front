import { CarRental } from './carRental.model';
import { User } from './user.model';

export interface Driver extends User {
  licenceDriverNumber: string;
  image: string;
  listCarRental: CarRental[]
}
