import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { ITablePix } from '../interfaces/itable-pix';

@Injectable({
  providedIn: 'root'
})
export class TablePixService {

  private path_url: string = `${MY_ENVIRONMENT.mainUrl}/api/pix`;

  constructor(private p_http: HttpClient) { }

  getAllPix(): Observable<ITablePix[]> {
    return this.p_http.get<ITablePix[]>(`${this.path_url}`);
  }
}
