import { Car } from './../interfaces/car.model';
import { CarRentalRequest } from './../interfaces/carRentalRequest.model';
import { CarRental } from './../interfaces/carRental.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HeaderHelper} from "../helpers/header.helper";


@Injectable({
  providedIn: 'root'
})
export class CarRentalService {

  constructor(
    private http: HttpClient,
    private headerHelper: HeaderHelper
  ) { }

  getAllCarRentals(): Observable<CarRental[]> {
    return this.http.get<CarRental[]>(environment.backendUrl + '/car-rental')
  }

  getCarRentalWhereCollaborateurIsReserve(): Observable<CarRental[]> {
    return this.http.get<CarRental[]>(environment.backendUrl + '/car-rental/carrental-reserved')
  }

  create(carRental: CarRentalRequest, carId: number) {
    const headers = this.headerHelper.getHeaders();
    return this.http.put<CarRental>(environment.backendUrl + `/car-rental/reserve/${carId}`, carRental, {
      headers
    })
  }

}
