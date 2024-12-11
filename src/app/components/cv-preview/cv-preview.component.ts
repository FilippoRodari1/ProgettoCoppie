import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.css'],
  imports: [FormsModule, CommonModule]

})
export class CvPreviewComponent {
  @Input() cvData: { name: string; email: string; experience: string } | null = null;

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
}
