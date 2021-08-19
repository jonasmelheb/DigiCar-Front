import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Carpooling} from "../interfaces/carpooling.model";
import {environment} from "../../../environments/environment";
import {HeaderHelper} from "../helpers/header.helper";
import {CarpoolingDetail} from "../interfaces/carpoolingDetail.model";

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {

  constructor(
    private http: HttpClient,
    private headerHelper: HeaderHelper
  ) {
  }

  create(carpooling: Carpooling) {
    const headers = this.headerHelper.getHeaders();
    return this.http.post<Carpooling>(environment.backendUrl + '/carpooling', carpooling, {
      headers
    })
  }

  getAllCarpoolings() {
    return this.http.get<CarpoolingDetail[]>(environment.backendUrl + '/carpooling')
  }

  getCarpoolingById(id: number) {
    return this.http.get<CarpoolingDetail>(environment.backendUrl + `/carpooling/+${id}`)
  }
}
