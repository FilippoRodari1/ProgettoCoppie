import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CvFormComponent } from './cv-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('CvFormComponent', () => {
  let component: CvFormComponent;
  let fixture: ComponentFixture<CvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvFormComponent],
      imports: [FormsModule, HttpClientTestingModule],  
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('label')?.textContent).toContain('Nome:');
  });

  it('should bind input values to cvData object', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Simula l'inserimento di valori nel form
    const nameInput = compiled.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const experienceTextarea = compiled.querySelector('textarea[name="experience"]') as HTMLTextAreaElement;

    nameInput.value = 'Mario Rossi';
    emailInput.value = 'mario.rossi@example.com';
    experienceTextarea.value = 'Esperienza di lavoro';

    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    experienceTextarea.dispatchEvent(new Event('input'));

    expect(component.cvData.name).toBe('Mario Rossi');
    expect(component.cvData.email).toBe('mario.rossi@example.com');
    expect(component.cvData.experience).toBe('Esperienza di lavoro');
  });

  it('should call submitForm when the form is submitted', () => {
    spyOn(component, 'submitForm');

    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.submitForm).toHaveBeenCalled();
  });
});
