import { Carrental } from './carrental.model';
import { User } from './user.model';

export interface Driver extends User {
  licenceDriverNumber: string;
  image: string;
  listCarRental: Carrental[]
}
