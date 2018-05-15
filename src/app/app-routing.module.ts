import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AddvideoComponent } from '../components/addvideo/addvideo.component';
import { VideosComponent } from '../components/videos/videos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: VideosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
