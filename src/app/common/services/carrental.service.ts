import { HeaderHelper } from './../helpers/header.helper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";

import { Carrental } from '../interfaces/carrental.model'


@Injectable({
  providedIn: 'root'
})
export class CarrentalService {

  constructor(private httpClient: HttpClient, private headerHelper: HeaderHelper) {

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
  //token vscode://vscode.github-authentication/did-authenticate?windowid=1&code=ee5e7f67742dc636da28&state=a07c637e-2193-495d-a946-94d34a4a496d
}
