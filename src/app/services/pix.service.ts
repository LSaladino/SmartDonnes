import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MY_ENVIRONMENT } from '../environments/environment.prod';
import { Pix } from '../Models/Pix';

@Injectable({
  providedIn: 'root'
})
export class PixService {

  MainUrl = `${MY_ENVIRONMENT.mainUrl}/api/pix`;

  constructor(private http: HttpClient) { }

  //POST METHOD
  CreateNewPix(pix: Pix) {
    return this.http.post<Pix>(`${this.MainUrl}`, pix);
  }

  //GET ALL METHOD
  GetAllPix(): Observable<Pix[]> {
    return this.http.get<Pix[]>(`${this.MainUrl}`);
  }

  //GET BY ID
  GetPixById(id: number): Observable<Pix> {
    return this.http.get<Pix>(`${this.MainUrl}/${id}`);
  }

  // PUT METHOD
  UpdatePix(pixId: number, pix: Pix) {
    return this.http.put<Pix>(`${this.MainUrl}/${pixId}`, pix);
  }

  // DELETE METHOD
  RemovePix(pixId: number) {
    return this.http.delete<Pix>(`${this.MainUrl}/${pixId}`);
  }
}