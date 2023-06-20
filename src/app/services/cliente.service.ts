import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { Cliente } from '../Models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  MainUrl = `${MY_ENVIRONMENT.mainUrl}/api/cliente`;

  constructor(private http: HttpClient) { }

  //POST METHOD
  CreateNewClient(cliente: Cliente) {
    return this.http.post<Cliente>(`${this.MainUrl}`, cliente);
  }

  //GET ALL METHOD
  GetAllClient(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.MainUrl}`);
  }

  //GET BY ID
  GetClientById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.MainUrl}/${id}`);
  }

  // PUT METHOD
  UpdateClient(clienteId: number, cliente: Cliente) {
    return this.http.put<Cliente>(`${this.MainUrl}/${clienteId}`, cliente);
  }

  // DELETE METHOD
  RemoveClient(clienteId: number) {
    return this.http.delete<Cliente>(`${this.MainUrl}/${clienteId}`);
  }
}
