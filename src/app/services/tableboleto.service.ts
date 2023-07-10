import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { ITableBoleto } from '../interfaces/itable-boleto';

@Injectable({
  providedIn: 'root'
})
export class TableBoletoService {

  private path_url: string = `${MY_ENVIRONMENT.mainUrl}/api/boleto`;

  constructor(private p_http: HttpClient) { }

  getAllUsers(): Observable<ITableBoleto[]> {
    return this.p_http.get<ITableBoleto[]>(`${this.path_url}`);
  }
}
