import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Mintel } from '../../models/mintel';
import { Resnombres } from '../../models/resnombres';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  Url1= 'http://192.168.111.52:8090';

  getToken(doc: Mintel): Observable<any>{
    return this.http.post(this.Url1+"/iess/firmaec/token",doc,{
      responseType: 'text'
    });
  }

  getID(nombres: any[],cedula: String){
    return this.http.post<Resnombres[]>(this.Url1+"/iess/firmaec/"+cedula,nombres);
  }

  getDocuments(ids: any[], cedula: String): Observable<any>{
    return this.http.post(this.Url1+"/iess/firmaec/documentos/"+cedula,ids,{
      responseType: 'blob' // Esperamos un blob como respuesta
    });
  }
}
