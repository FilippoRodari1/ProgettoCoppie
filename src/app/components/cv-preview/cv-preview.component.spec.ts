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

  it('should display the name, email, and experience dynamically', () => {
    // Imposta dei dati di prova per cvData
    component.cvData = {
      name: 'Giovanni Rossi',
      email: 'giovanni.rossi@example.com',
      experience: 'Esperienza lavorativa in Angular e TypeScript.'
    };

    // Esegui il rilevamento delle modifiche
    fixture.detectChanges();

    // Controlla se i dati sono visibili nel DOM
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('p');
    const emailElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[1]; // Secondo <p> per l'email
    const experienceElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[2]; // Terzo <p> per l'esperienza

    expect(nameElement.textContent).toContain('Giovanni Rossi');
    expect(emailElement.textContent).toContain('giovanni.rossi@example.com');
    expect(experienceElement.textContent).toContain('Esperienza lavorativa in Angular e TypeScript.');
  });

  it('should display "Non fornito" if the cvData is empty', () => {
    // Imposta un cvData vuoto
    component.cvData = {
      name: '',
      email: '',
      experience: ''
    };

    // Esegui il rilevamento delle modifiche
    fixture.detectChanges();

    // Controlla se vengono mostrati i valori di default
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('p');
    const emailElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[1];
    const experienceElement: HTMLElement = fixture.nativeElement.querySelectorAll('p')[2];

    expect(nameElement.textContent).toContain('Non fornito');
    expect(emailElement.textContent).toContain('Non fornito');
    expect(experienceElement.textContent).toContain('Non fornito');
  });
});
