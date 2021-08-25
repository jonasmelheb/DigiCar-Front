import { Driver } from './driver.model';
import { User } from './user.model';
import { CarForCarRental } from './carForCarRental.model';

export interface CarRental{
  id: number;
  dateDepart: string;
  dateArrivee: string;
  isDriver: boolean;
  driver: Driver;
  collaborateur: User;
  usedCar: CarForCarRental;
}
