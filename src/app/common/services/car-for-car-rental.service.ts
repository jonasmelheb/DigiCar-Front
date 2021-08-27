import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeaderHelper } from '../helpers/header.helper';
import { Car } from '../interfaces/car.model';
import { CarForCarRentalDetails } from '../interfaces/carForCarRentalDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CarForCarRentalService {

  constructor(
    private httpClient: HttpClient,
    private headerHelper: HeaderHelper
  ) { }

  create(carForCarRental: Car) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.post<Car>(environment.backendUrl + '/car/add-car/admin', carForCarRental, {
      headers
    })
  }

  getCarForCarRental() {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<Car[]>(environment.backendUrl + '/car/cars-for-carrental', {
      headers
    });
  }

  getCarForCarRentalById(id: number){
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<CarForCarRentalDetails>(environment.backendUrl + `/car/admin/${id}`, {
      headers
    })
  }

  delete(id: number) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.delete<void>(environment.backendUrl + `/car/delete-car/${id}`, {
      headers
    })
  }

  updateCarForCarRental(id: number, carForCarRental: Car) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.put<Car>(environment.backendUrl + `/car/update/${id}`, carForCarRental, {
      headers
    })
  }

}
