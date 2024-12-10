import { Component } from '@angular/core';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { CvPreviewComponent } from './components/cv-preview/cv-preview.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CvFormComponent, CvPreviewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crea il tuo Curriculum';
  cvData = {
    name: 'Mario Rossi',
    email: 'mario.rossi@example.com',
    experience: 'Esperienza come sviluppatore Angular.'
  };
}
