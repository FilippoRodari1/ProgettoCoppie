import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvPreviewComponent } from './cv-preview.component';

describe('CvPreviewComponent', () => {
  let component: CvPreviewComponent;
  let fixture: ComponentFixture<CvPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvPreviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Anteprima del Curriculum" when cvData is provided', () => {
    component.cvData = {
      name: 'Mario Rossi',
      email: 'mario.rossi@example.com',
      experience: 'Esperienza come sviluppatore.'
    };
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Anteprima del Curriculum');
    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain('Mario Rossi');
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain('mario.rossi@example.com');
    expect(compiled.querySelector('p:nth-of-type(4)')?.textContent).toContain('Esperienza come sviluppatore.');
  });

  it('should render a placeholder message when cvData is null', () => {
    component.cvData = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Inserisci i dati per vedere l\'anteprima del curriculum.');
  });
});
