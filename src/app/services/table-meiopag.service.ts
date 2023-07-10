import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { ITableMeioPagamento } from '../interfaces/itable-meio-pagamento';

@Injectable({
  providedIn: 'root'
})
export class TableMeioPagService {

  private path_url: string = `${MY_ENVIRONMENT.mainUrl}/api/meiopagamento`;

  constructor(private p_http: HttpClient) { }

  getAllMeioPag(): Observable<ITableMeioPagamento[]> {
    return this.p_http.get<ITableMeioPagamento[]>(`${this.path_url}`);
  }
}
