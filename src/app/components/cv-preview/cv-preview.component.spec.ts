import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvPreviewComponent } from './cv-preview.component';
import { CommonModule } from '@angular/common';

describe('CvPreviewComponent', () => {
  let component: CvPreviewComponent;
  let fixture: ComponentFixture<CvPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvPreviewComponent ],
      imports: [CommonModule]  // Importa CommonModule per le direttive come ngIf
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Rende il componente attivo per il rendering iniziale
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name, surname, email, and experience dynamically', () => {
    // Imposta dei dati di prova per cvData
    component.cvData = {
      name: 'Giovanni Rossi',
      surname: 'Rossi',
      email: 'giovanni.rossi@example.com',
      experience: 'Esperienza lavorativa in Angular e TypeScript.',
      phone: '1234567890',
      profile: 'Software Engineer',
      languages: 'Italiano, Inglese',
      license: 'B',
      address: 'Via Roma 123, Milano'
    };

    // Esegui il rilevamento delle modifiche
    fixture.detectChanges();

    // Controlla se i dati sono visibili nel DOM
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('p');
    const surnameElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[1]; // Cognome
    const emailElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[2]; // Email
    const experienceElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[3]; // Esperienza

    expect(nameElement.textContent).toContain('Giovanni Rossi');
    expect(surnameElement.textContent).toContain('Rossi');
    expect(emailElement.textContent).toContain('giovanni.rossi@example.com');
    expect(experienceElement.textContent).toContain('Esperienza lavorativa in Angular e TypeScript.');
  });

  it('should display "Non fornito" if any cvData field is empty', () => {
    // Imposta un cvData con campi vuoti
    component.cvData = {
      name: '',
      surname: '',
      email: '',
      experience: '',
      phone: '',
      profile: '',
      languages: '',
      license: '',
      address: ''
    };

    // Esegui il rilevamento delle modifiche
    fixture.detectChanges();

    // Controlla se i valori di default "Non fornito" vengono visualizzati nel DOM
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('p');
    const surnameElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[1];
    const emailElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[2];
    const experienceElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[3];

    expect(nameElement.textContent).toContain('Non fornito');
    expect(surnameElement.textContent).toContain('Non fornito');
    expect(emailElement.textContent).toContain('Non fornito');
    expect(experienceElement.textContent).toContain('Non fornito');
  });
});
