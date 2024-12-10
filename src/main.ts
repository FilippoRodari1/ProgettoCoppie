import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Aggiungi questa riga

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // Aggiungi il provider per HttpClient
  ]
});
