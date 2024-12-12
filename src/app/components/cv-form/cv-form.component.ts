import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CvPreviewComponent } from "../cv-preview/cv-preview.component";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, CvPreviewComponent]
})
export class CvFormComponent {
  
  downloadAsPDF(): void {
    const element = document.getElementById('cv-content');
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calcolo delle dimensioni per l'immagine
        const imgWidth = 190; // Larghezza in mm
        const pageHeight = 297; // Altezza della pagina in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;

        let position = 0;

        // Aggiungi immagine al PDF
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

        // Salva il PDF
        pdf.save('curriculum.pdf');
      });
    }
  }
  // Dati iniziali per il curriculum
  cvData = {
    name: '',
    email: '',
    experience: ''
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
}
