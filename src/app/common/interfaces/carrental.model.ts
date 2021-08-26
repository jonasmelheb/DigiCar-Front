import { Driver } from './driver.model';
import { CarForCarRental } from './carForCarRental.model';
import { User } from './user.model';

export interface Carrental {
  id: number;
  dateDepart: string;
  dateArrivee: string;
  isDriver: boolean;
  driver: Driver;
  collaborateur: User;
  usedCar: CarForCarRental;
}
