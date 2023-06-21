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
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { TableComponent } from './components/cliente/table/table.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrComponentlessModule } from 'ngx-toastr/public_api';
@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    MenubarComponent,
    MainComponent,
    TituloComponent,
    AvaliacaoComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // --------------------------------------------------
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      preventDuplicates:true,
      timeOut:3000,
      easing:'ease-in',
      easeTime:1000
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
