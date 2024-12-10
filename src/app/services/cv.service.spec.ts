import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CvService } from './cv.service';

describe('CvService', () => {
  let service: CvService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Aggiungi HttpClientTestingModule
      providers: [CvService], // Servizio da testare
    });
    service = TestBed.inject(CvService); // Inietta il servizio
    httpMock = TestBed.inject(HttpTestingController); // Inietta HttpTestingController
  });

  afterEach(() => {
    // Verifica che non ci siano richieste HTTP pendenti
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a CV', () => {
    const mockCvData = {
      name: 'Mario Rossi',
      email: 'mario.rossi@example.com',
      experience: '5 anni di esperienza in sviluppo software',
    };

    service.createCv(mockCvData).subscribe(response => {
      expect(response.message).toBe('Curriculum creato con successo');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/cv'); // Controlla l'URL
    expect(req.request.method).toBe('POST'); // Verifica che sia una richiesta POST
    expect(req.request.body).toEqual(mockCvData); // Verifica che i dati siano corretti
    req.flush({ message: 'Curriculum creato con successo' }); // Mock della risposta
  });

  it('should fetch all CVs via GET request', () => {
    const mockCvs = [
      {
        name: 'Mario Rossi',
        email: 'mario.rossi@example.com',
        experience: '5 anni di esperienza in sviluppo software',
      },
      {
        name: 'Giulia Bianchi',
        email: 'giulia.bianchi@example.com',
        experience: '2 anni di esperienza come progettista UX',
      },
    ];

    service.getAllCvs().subscribe(cvs => {
      expect(cvs.length).toBe(2); // Verifica che il numero di CV restituiti sia corretto
      expect(cvs).toEqual(mockCvs); // Verifica che i dati siano corretti
    });

    const req = httpMock.expectOne('http://localhost:5000/api/cv'); // Controlla l'URL
    expect(req.request.method).toBe('GET'); // Verifica che sia una richiesta GET
    req.flush(mockCvs); // Mock della risposta con i CV
  });
});
