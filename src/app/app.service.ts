import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CalculoTotal } from './models/cobranca';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly rootURL = 'https://localhost:5001/';

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getData(id) {
    return this.http.get<any>(`${this.rootURL}v1/clientes/${id}`);
  }

  postData(formData: any) {
    formData.parcela = Math.floor(formData.Parcela);

    return this.http.post<any>(
      `${this.rootURL}v1/cobranca/simulavalortotal`,
      formData
    );
  }
}
