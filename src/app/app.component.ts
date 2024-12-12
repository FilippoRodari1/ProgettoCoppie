import { Component } from '@angular/core';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CvFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crea il tuo Curriculum';
  cvData = {
    name: '',
    email: '',
    experience: ''
  };
}
