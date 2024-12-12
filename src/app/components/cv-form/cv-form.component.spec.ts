import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CvFormComponent } from './cv-form.component';

describe('CvFormComponent', () => {
  let component: CvFormComponent;
  let fixture: ComponentFixture<CvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvFormComponent],
      imports: [FormsModule],
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
    const surnameInput = compiled.querySelector('input[name="surname"]') as HTMLInputElement;
    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = compiled.querySelector('input[name="phone"]') as HTMLInputElement;
    const profileTextarea = compiled.querySelector('textarea[name="profile"]') as HTMLTextAreaElement;
    const languagesInput = compiled.querySelector('input[name="languages"]') as HTMLInputElement;
    const licenseInput = compiled.querySelector('input[name="license"]') as HTMLInputElement;
    const addressInput = compiled.querySelector('input[name="address"]') as HTMLInputElement;
    const experienceTextarea = compiled.querySelector('textarea[name="experience"]') as HTMLTextAreaElement;

    nameInput.value = 'Mario Rossi';
    surnameInput.value = 'Rossi';
    emailInput.value = 'mario.rossi@example.com';
    phoneInput.value = '1234567890';
    profileTextarea.value = 'Sviluppatore web';
    languagesInput.value = 'Italiano, Inglese';
    licenseInput.value = 'Patente B';
    addressInput.value = 'Via Roma 123, Milano';
    experienceTextarea.value = 'Esperienza di lavoro';

    nameInput.dispatchEvent(new Event('input'));
    surnameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    phoneInput.dispatchEvent(new Event('input'));
    profileTextarea.dispatchEvent(new Event('input'));
    languagesInput.dispatchEvent(new Event('input'));
    licenseInput.dispatchEvent(new Event('input'));
    addressInput.dispatchEvent(new Event('input'));
    experienceTextarea.dispatchEvent(new Event('input'));

    expect(component.cvData.name).toBe('Mario Rossi');
    expect(component.cvData.surname).toBe('Rossi');
    expect(component.cvData.email).toBe('mario.rossi@example.com');
    expect(component.cvData.phone).toBe('1234567890');
    expect(component.cvData.profile).toBe('Sviluppatore web');
    expect(component.cvData.languages).toBe('Italiano, Inglese');
    expect(component.cvData.license).toBe('Patente B');
    expect(component.cvData.address).toBe('Via Roma 123, Milano');
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
