import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true

})
export class CvPreviewComponent {
    @Input() cvData: {
      name: string;
      surname: string;
      email: string;
      experience: string;
      phone: string;
      profile: string;
      languages: string;
      license: string;
      address: string;
    } | null = null;
 
}

