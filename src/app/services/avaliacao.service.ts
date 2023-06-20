import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { Avaliacao } from '../Models/Avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  MainUrl = `${MY_ENVIRONMENT.mainUrl}/api/cliente`;

  constructor(private http: HttpClient) { }

  CreateNewAval(avaliacao: Avaliacao) {
    return this.http.post<Avaliacao>(`${this.MainUrl}`, avaliacao);
  }
}
