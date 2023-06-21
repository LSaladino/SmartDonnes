import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { ITableCliente } from '../interfaces/itable-cliente';

@Injectable({
  providedIn: 'root'
})
export class TableclienteService {

  private path_url: string = `${MY_ENVIRONMENT.mainUrl}/api/cliente`;

  constructor(private p_http: HttpClient) { }

  getAllUsers(): Observable<ITableCliente[]> {
    return this.p_http.get<ITableCliente[]>(`${this.path_url}`);
  }
}
