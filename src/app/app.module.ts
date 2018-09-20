import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import {
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule
} from "@angular/material";
import { AppComponent } from "./app.component";
import { HomeComponent } from "../components/home/home.component";
import { AddvideoComponent } from "../components/addvideo/addvideo.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VideoInfoService } from "../services/video-info.service";
import { HttpModule } from "@angular/http";
import { ViewVideoComponent } from "../components/view-video/view-video.component";
import { VideosComponent } from "../components/videos/videos.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddvideoComponent,
    ViewVideoComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    NgxPaginationModule
  ],
  providers: [VideoInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
