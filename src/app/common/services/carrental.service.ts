import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";

import { Carrental } from '../interfaces/carrental.model'


@Injectable({
  providedIn: 'root'
})
export class CarrentalService {

  constructor(private httpClient: HttpClient,private router: Router) {

  }

   public getById(id:number) {
     return this.httpClient.get<Carrental>(environment.backendUrl + '/carrental/'+id);
  }
}
