import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AddvideoComponent } from '../components/addvideo/addvideo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AddvideoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
