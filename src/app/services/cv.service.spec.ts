import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CvService } from './cv.service';

describe('CvService', () => {
  let service: CvService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
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

  it('should send a POST request to create a CV with all fields', () => {
    const mockCvData = {
      name: 'Mario',
      surname: 'Rossi',
      email: 'mario.rossi@example.com',
      experience: '5 anni di esperienza in sviluppo software',
      phone: '1234567890',
      profile: 'Sviluppatore full-stack con esperienza in Angular e Node.js.',
      languages: 'Italiano, Inglese',
      license: 'Patente B',
      address: 'Via Roma 123, Milano'
    };

    service.createCv(mockCvData).subscribe(response => {
      expect(response.message).toBe('Curriculum creato con successo');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/cv'); // Controlla l'URL
    expect(req.request.method).toBe('POST'); // Verifica che sia una richiesta POST
    expect(req.request.body).toEqual({
      ...mockCvData,
    }); // Verifica che i dati siano corretti
    req.flush({ message: 'Curriculum creato con successo' }); // Mock della risposta
  });

  it('should fetch all CVs via GET request', () => {
    const mockCvs = [
      {
        name: 'Mario',
        surname: 'Rossi',
        email: 'mario.rossi@example.com',
        experience: '5 anni di esperienza in sviluppo software',
        phone: '1234567890',
        profile: 'Sviluppatore full-stack con esperienza in Angular e Node.js.',
        languages: 'Italiano, Inglese',
        license: 'Patente B',
        address: 'Via Roma 123, Milano'
      },
      {
        name: 'Giulia',
        surname: 'Bianchi',
        email: 'giulia.bianchi@example.com',
        experience: '2 anni di esperienza come progettista UX',
        phone: '0987654321',
        profile: 'Progettista UX con esperienza in user research e design.',
        languages: 'Italiano, Inglese, Francese',
        license: 'Patente A',
        address: 'Via Milano 45, Torino'
      }
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
