import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TickeadorComponent } from './tickeador/tickeador.component';
import { UsersComponent } from './users/users.component';
import { MetricasComponent } from './metricas/metricas.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'tickeador', component:TickeadorComponent},
  {path:'users', component:UsersComponent},
  {path:'metricas/:id', component:MetricasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
