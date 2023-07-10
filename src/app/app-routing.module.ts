import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PixComponent } from './components/pix/pix.component';
import { BoletoComponent } from './components/boleto/boleto.component';
import { TableBoletoComponent } from './components/boleto/table/table-boleto.component';
import { MainComponent } from './components/main/main.component';
import { TablePixComponent } from './components/pix/table/table-pix.component';
import { MeioPagamentoComponent } from './components/meio-pagamento/meio-pagamento.component';
import { TableMeioPagamentoComponent } from './components/meio-pagamento/table/table-meio-pagamento.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'meio-pagamento', component: MeioPagamentoComponent },
  { path: 'boleto', component: BoletoComponent },
  { path: 'pix', component: PixComponent },
  { path: 'table-boleto', component: TableBoletoComponent },
  { path: 'table-pix', component: TablePixComponent },
  { path: 'table-meio-pagamento', component: TableMeioPagamentoComponent },
  { path: 'selecao', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
