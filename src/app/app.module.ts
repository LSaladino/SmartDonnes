import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';

// ---------------------------------------------------------------------------
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './share/material/material.module';
import { MenubarComponent } from './components/menubar/menubar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { TituloComponent } from './components/titulo/titulo.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    MenubarComponent,
    MainComponent,
    TituloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // --------------------------------------------------
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
