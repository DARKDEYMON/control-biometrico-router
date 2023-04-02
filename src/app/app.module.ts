import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TickeadorComponent } from './tickeador/tickeador.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import "./core/modules/WebSdk";
import { MetricasComponent } from './metricas/metricas.component';

@NgModule({
  declarations: [
    AppComponent,
    TickeadorComponent,
    HomeComponent,
    UsersComponent,
    MetricasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
