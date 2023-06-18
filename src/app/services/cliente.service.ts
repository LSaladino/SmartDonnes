import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { Cliente } from '../Models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  MainUrl = `${MY_ENVIRONMENT.mainUrl}/api/cliente`;

  constructor(private http: HttpClient) { }

  CreateNewClient(cliente: Cliente) {
    return this.http.post<Cliente>(`${this.MainUrl}`, cliente);
  }
}
