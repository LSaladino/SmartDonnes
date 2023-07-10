import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoletoComponent } from './components/boleto/boleto.component';

// ---------------------------------------------------------------------------
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './share/material/material.module';
import { MenubarComponent } from './components/menubar/menubar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { PixComponent } from './components/pix/pix.component';
import { TableBoletoComponent } from './components/boleto/table/table-boleto.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TablePixComponent } from './components/pix/table/table-pix.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MeioPagamentoComponent } from './components/meio-pagamento/meio-pagamento.component';
import { TableMeioPagamentoComponent } from './components/meio-pagamento/table/table-meio-pagamento.component';
@NgModule({
  declarations: [
    AppComponent,
    BoletoComponent,
    MenubarComponent,
    MainComponent,
    TituloComponent,
    PixComponent,
    TableBoletoComponent,
    ConfirmDialogComponent,
    TablePixComponent,
    MeioPagamentoComponent,
    TableMeioPagamentoComponent
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
      preventDuplicates: true,
      timeOut: 3000,
      easing: 'ease-in',
      easeTime: 1000
    }),
    QRCodeModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
