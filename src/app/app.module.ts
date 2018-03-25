import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSelectModule, MatInputModule, MatToolbarModule, MatCardModule } from '@angular/material';


import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { appRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {}
    ),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatSelectModule, MatInputModule, MatToolbarModule, MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
