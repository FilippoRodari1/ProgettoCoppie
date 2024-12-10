import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 'root' fa in modo che il servizio venga fornito globalmente
})
export class CvService {
  private apiUrl = 'http://localhost:5000/api/cv';

  constructor(private http: HttpClient) {} // Inietta HttpClient

  createCv(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllCvs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
