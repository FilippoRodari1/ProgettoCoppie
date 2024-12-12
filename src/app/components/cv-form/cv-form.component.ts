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
    this.http.post('http://localhost:5000/api/cv', this.cvData).subscribe(
      (response) => {
        console.log('Dati salvati con successo', response);
        alert('Curriculum generato con successo!');
      },
      (error) => {
        console.error('Errore nell\'invio dei dati', error);
        alert('Errore nell\'invio dei dati al server.');
      }
    );
  }

  downloadAsPDF() {
    const doc = new jsPDF();
  
    // Titolo del Curriculum
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text('Curriculum Vitae', 105, 20, { align: 'center' });
  
    // Linea separatrice
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
  
    // Dati personali
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    const personalData = [
      `Nome: ${this.cvData.name} ${this.cvData.surname}`,
      `Telefono: ${this.cvData.phone}`,
      `Email: ${this.cvData.email}`,
      `Lingue: ${this.cvData.languages}`,
      `Patente: ${this.cvData.license}`,
      `Indirizzo: ${this.cvData.address}`,
    ];

     // Linea separatrice
     doc.setLineWidth(0.5);
     doc.line(20, 30, 190, 30);
  
    let yOffset = 50; // Posizione iniziale per i dati personali
    personalData.forEach((line) => {
      doc.text(line, 20, yOffset);
      yOffset += 10;
    });
  
    // Sezione Profilo
    if (this.cvData.profile) {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text('Profilo', 20, yOffset + 10);
  
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const profileText = this.cvData.profile.split("\n");
      yOffset += 20;
      profileText.forEach((line) => {
        doc.text(line, 20, yOffset);
        yOffset += 10;
      });
    }

     // Linea separatrice
     doc.setLineWidth(0.5);
     doc.line(20, 30, 190, 30);
  
    // Sezione Esperienze Professionali
    if (this.cvData.experience) {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text('Esperienze Professionali', 20, yOffset + 10);
  
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const experienceText = this.cvData.experience.split("\n");
      yOffset += 20;
      experienceText.forEach((line) => {
        doc.text(line, 20, yOffset);
        yOffset += 10;
      });
    }
  
    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Curriculum generato automaticamente", 105, yOffset + 20, { align: 'center' });
  
    // Salva il documento come PDF
    doc.save('curriculum.pdf');
  }
  
  
}
