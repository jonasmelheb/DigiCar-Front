import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarForCarRental } from '../interfaces/carForCarRental.model';

@Injectable({
  providedIn: 'root'
})
export class CarForCarRentalService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCarForCarRental() {
    return this.httpClient.get<CarForCarRental[]>(environment.backendUrl + '/car/cars-for-carrental');
  }
}
