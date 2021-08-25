import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeaderHelper } from '../helpers/header.helper';
import { CarForCarRental } from '../interfaces/carForCarRental.model';
import { CarForCarRentalDetails } from '../interfaces/carForCarRentalDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CarForCarRentalService {

  constructor(
    private httpClient: HttpClient,
    private headerHelper: HeaderHelper
  ) { }

  create(carForCarRental: CarForCarRental) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.post<CarForCarRental>(environment.backendUrl + '/car/add-car/admin', carForCarRental, {
      headers
    })
  }

  getCarForCarRental() {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<CarForCarRental[]>(environment.backendUrl + '/car/cars-for-carrental', {
      headers
    });
  }

  getCarForCarRentalById(id: number){
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<CarForCarRentalDetails>(environment.backendUrl + `/car/admin/${id}`, {
      headers
    })
  }

  updateCarForCarRental(id: number, carForCarRental: CarForCarRental) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.put<CarForCarRental>(environment.backendUrl + `/car/update/${id}`, carForCarRental, {
      headers
    })
  }

}
