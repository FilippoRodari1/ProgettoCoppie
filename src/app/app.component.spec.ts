import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { CvPreviewComponent } from './components/cv-preview/cv-preview.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule          
      ],
      declarations: [
        AppComponent,         
        CvFormComponent,      
        CvPreviewComponent   
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ProgettoCoppie'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ProgettoCoppie');
  });

  it('should render the title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ProgettoCoppie');
  });

  it('should contain cv-form and cv-preview components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica la presenza dei componenti figli
    expect(compiled.querySelector('app-cv-form')).toBeTruthy();
    expect(compiled.querySelector('app-cv-preview')).toBeTruthy();
  });
});
