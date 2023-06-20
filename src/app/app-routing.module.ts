import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path:'', redirectTo:'main', pathMatch:'full'},
  {path:'main', component:MainComponent},
  {path:'cliente', component:ClienteComponent},
  {path:'avaliacao', component:AvaliacaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
