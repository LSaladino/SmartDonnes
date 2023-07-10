import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { ITableMeioPagamento } from '../interfaces/itable-meio-pagamento';
import { MeioPagamento } from '../Models/MeioPagamento';

@Injectable({
  providedIn: 'root'
})
export class MeioPagamentoService {

  MainUrl = `${MY_ENVIRONMENT.mainUrl}/api/meiopagamento`;

  constructor(private http: HttpClient) { }

  //POST METHOD
  CreateNewMeioPag(meioPagamento: MeioPagamento) {
    return this.http.post<MeioPagamento>(`${this.MainUrl}`, meioPagamento);
  }

  //GET ALL METHOD
  GetAllMeioPag(): Observable<MeioPagamento[]> {
    return this.http.get<MeioPagamento[]>(`${this.MainUrl}`);
  }

  //GET BY ID
  GetMeioPagById(id: number): Observable<MeioPagamento> {
    return this.http.get<MeioPagamento>(`${this.MainUrl}/${id}`);
  }

  // PUT METHOD
  UpdateMeioPag(meiopagId: number, meioPagamento: MeioPagamento) {
    return this.http.put<MeioPagamento>(`${this.MainUrl}/${meiopagId}`, meioPagamento);
  }

  // DELETE METHOD
  RemoveMeioPag(meiopagId: number) {
    return this.http.delete<MeioPagamento>(`${this.MainUrl}/${meiopagId}`);
  }
}