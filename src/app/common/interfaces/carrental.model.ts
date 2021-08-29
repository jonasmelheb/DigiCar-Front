import { Driver } from './driver.model';
import { User } from './user.model';
import {CarForCarRentalDetails} from "./carForCarRentalDetails.model";

export interface Carrental {
  id: number;
  dateDepart: string;
  dateArrivee: string;
  isDriver: boolean;
  driver: Driver;
  collaborateur: User;
  usedCar: CarForCarRentalDetails;
}
