import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { Boleto } from '../Models/Boleto';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  MainUrl = `${MY_ENVIRONMENT.mainUrl}/api/boleto`;

  constructor(private http: HttpClient) { }

  //POST METHOD
  CreateNewBoleto(boleto: Boleto) {
    return this.http.post<Boleto>(`${this.MainUrl}`, boleto);
  }

  //GET ALL METHOD
  GetAllBoleto(): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.MainUrl}`);
  }

  //GET BY ID
  GetBoletoById(id: number): Observable<Boleto> {
    return this.http.get<Boleto>(`${this.MainUrl}/${id}`);
  }

  // PUT METHOD
  UpdateBoleto(boletoId: number, boleto: Boleto) {
    return this.http.put<Boleto>(`${this.MainUrl}/${boletoId}`, boleto);
  }

  // DELETE METHOD
  RemoveBoleto(boletoId: number) {
    return this.http.delete<Boleto>(`${this.MainUrl}/${boletoId}`);
  }
}
