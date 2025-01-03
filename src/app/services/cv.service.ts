import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaccia per definire la struttura dei dati del CV
export interface CvData {
  name: string;
  surname: string;
  email: string;
  experience: string;
  phone: string;
  profile: string;
  languages: string;
  license: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apiUrl = 'http://localhost:5000/api/cv';  // URL del tuo backend

  constructor(private http: HttpClient) {}

  // Funzione per inviare i dati del CV
  createCv(cvData: CvData): Observable<any> {
    return this.http.post<any>(this.apiUrl, cvData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Funzione per ottenere tutti i CV
  getAllCvs(): Observable<CvData[]> {
    return this.http.get<CvData[]>(this.apiUrl);
  }

  // Funzione per ottenere l'ultimo CV
  getLatestCv(): Observable<CvData> {
    const latestCvUrl = `${this.apiUrl}/latest`;  
    return this.http.get<CvData>(latestCvUrl);
  }
}
