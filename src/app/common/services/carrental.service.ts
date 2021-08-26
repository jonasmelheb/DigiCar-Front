import { CarRentalRequest } from './../interfaces/carRentalRequest.model';
import { HeaderHelper } from './../helpers/header.helper';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

import { Carrental } from '../interfaces/carrental.model'


@Injectable({
  providedIn: 'root'
})
export class CarrentalService {

  constructor(
    private httpClient: HttpClient,
    private headerHelper: HeaderHelper
  ) {
  }

  getById(id:number) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<Carrental>(environment.backendUrl + '/car-rental/' + id, {
      headers
    });
  }

  deleteById(id:number) {
     const headers = this.headerHelper.getHeaders();
    return this.httpClient.delete<Carrental>(environment.backendUrl + '/car-rental/'+id, {
       headers
     });
  }

  updateById(id:number) {
     const headers = this.headerHelper.getHeaders();
     return this.httpClient.put<Carrental>(environment.backendUrl + '/car-rental/'+id, {
       headers
     });
  }

  getAllCarRentals() {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<Carrental[]>(environment.backendUrl + '/car-rental', {
      headers
    })
  }

  getCarRentalWhereCollaborateurIsReserve(){
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.get<Carrental[]>(environment.backendUrl + `/car-rental/carrental-reserved/`, {
      headers
    })
  }

  create(carRental: CarRentalRequest, carId: number) {
    const headers = this.headerHelper.getHeaders();
    return this.httpClient.put<Carrental>(environment.backendUrl + `/car-rental/reserve/${carId}`, carRental, {
      headers
    })
  }
}
