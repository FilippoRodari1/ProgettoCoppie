import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CvPreviewComponent {
  @Input() cvData: { name: string; email: string; experience: string } | null = null;
}
