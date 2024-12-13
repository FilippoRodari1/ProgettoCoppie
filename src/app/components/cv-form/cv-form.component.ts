import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CvPreviewComponent } from "../cv-preview/cv-preview.component";

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, CvPreviewComponent]
})
export class CvFormComponent {
  // Inizializza cvData con i nuovi campi
  cvData = {
    name: '',
    surname: '',
    phone: '',
    profile: '',
    languages: '',
    license: '',
    address: '',
    experience: '',
    email: ''
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    // Esegui il POST per inviare i dati del curriculum
    this.http.post('http://localhost:5000/api/cv', this.cvData).subscribe(
      (response) => {
        console.log('Dati salvati con successo', response);
        alert('Curriculum generato con successo!');
        
        // Solo dopo il POST riuscito, esegui il GET per scaricare l'ultimo curriculum e generare il PDF
        this.downloadAsPDF();
      },
      (error) => {
        console.error('Errore nell\'invio dei dati', error);
        alert('Errore nell\'invio dei dati al server.');
      }
    );
  }

  downloadAsPDF() {
    // Esegui il GET per ottenere l'ultimo curriculum
    this.http.get<any>('http://localhost:5000/api/cv/latest').subscribe(
      (data) => {
        // Assegna i dati ricevuti dal server a cvData
        this.cvData = data;
  
        const doc = new jsPDF();
        const marginLeft = 20; // Margine sinistro
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginRight = pageWidth - marginLeft; // Margine destro
  
        let yOffset = 20; // Posizione iniziale per il contenuto
  
        // Titolo del Curriculum
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text('Curriculum Vitae', pageWidth / 2, yOffset, { align: 'center' });
  
        // Linea separatrice
        yOffset += 10;
        doc.setLineWidth(0.5);
        doc.line(marginLeft, yOffset, marginRight, yOffset);
  
        // Sezione Dati personali
        yOffset += 10;
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text('Dati Personali', marginLeft, yOffset);
  
        yOffset += 8;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const personalData = [
          `Nome: ${this.cvData.name} ${this.cvData.surname}`,
          `Telefono: ${this.cvData.phone}`,
          `Email: ${this.cvData.email}`,
          `Lingue: ${this.cvData.languages}`,
          `Patente: ${this.cvData.license}`,
          `Indirizzo: ${this.cvData.address}`,
        ];
  
        personalData.forEach((line) => {
          doc.text(line, marginLeft, yOffset);
          yOffset += 8;
        });
  
        // Linea separatrice
        yOffset += 5;
        doc.setLineWidth(0.3);
        doc.line(marginLeft, yOffset, marginRight, yOffset);
  
        // Sezione Profilo
        if (this.cvData.profile) {
          yOffset += 10;
          doc.setFontSize(16);
          doc.setFont("helvetica", "bold");
          doc.text('Profilo', marginLeft, yOffset);
  
          yOffset += 8;
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          const profileText = this.cvData.profile.split("\n");
          profileText.forEach((line) => {
            doc.text(line, marginLeft, yOffset);
            yOffset += 8;
          });
  
          // Linea separatrice
          yOffset += 5;
          doc.setLineWidth(0.3);
          doc.line(marginLeft, yOffset, marginRight, yOffset);
        }
  
        // Sezione Esperienze Professionali
        if (this.cvData.experience) {
          yOffset += 10;
          doc.setFontSize(16);
          doc.setFont("helvetica", "bold");
          doc.text('Esperienze Professionali', marginLeft, yOffset);
  
          yOffset += 8;
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          const experienceText = this.cvData.experience.split("\n");
          experienceText.forEach((line) => {
            doc.text(line, marginLeft, yOffset);
            yOffset += 8;
          });
  
          // Linea separatrice
          yOffset += 5;
          doc.setLineWidth(0.3);
          doc.line(marginLeft, yOffset, marginRight, yOffset);
        }
  
        // Footer
        yOffset += 20;
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(
          "Curriculum generato automaticamente",
          pageWidth / 2,
          yOffset,
          { align: 'center' }
        );
  
        // Salva il documento come PDF
        doc.save('curriculum.pdf');
      },
      (error) => {
        console.error('Errore nel recupero dei dati', error);
        alert('Errore nel recupero dei dati dal server.');
      }
    );
  }
}
