import { environment } from './../environments/environment.prod';
import { errorTailorConfig } from './core/resources/error-tailor-config';
import { LayoutModule } from './layouts/layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageRoutingModule } from './pages/pages-routing.module';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { HttpClientModule } from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PageRoutingModule,
    LayoutModule,
    ErrorTailorModule.forRoot(errorTailorConfig),
    HttpClientModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
