import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatSelectModule, MatInputModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoInfoService } from './video-info.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddvideoComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpModule,
    AppRoutingModule, ReactiveFormsModule, FormsModule,
    MatButtonModule, MatSelectModule, MatInputModule, MatToolbarModule, MatCardModule
  ],
  providers: [VideoInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
