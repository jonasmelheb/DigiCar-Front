import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeaderHelper } from '../helpers/header.helper';
import { Car } from '../interfaces/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private httpClient: HttpClient,
    private headerHelper: HeaderHelper
  ) { }

  getCarById(id: number){
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<Car>(environment.backendUrl + `/car/${id}`, {
      headers
    })
  }

  create(car: Car) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.post<Car>(environment.backendUrl + '/car', car, {
      headers
    })
  }

  updateCar(id: number, car: Car) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.put<Car>(environment.backendUrl + `/car/${id}`, car, {
      headers
    })
  }
}
