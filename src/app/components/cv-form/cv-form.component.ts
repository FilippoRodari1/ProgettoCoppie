import { Component } from '@angular/core';
import { CvService } from '../../services/cv.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  imports:[FormsModule, CommonModule]
  
})
export class CvFormComponent {
  cvData = {
    name: '',
    email: '',
    experience: ''
  };


  constructor(private cvService: CvService) {}

  submitForm() {
    this.cvService.createCv(this.cvData).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
