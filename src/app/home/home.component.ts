import { Component, OnInit } from '@angular/core';
import { VideoInfoService } from '../video-info.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private videoInfoService: VideoInfoService, public sanitizer: DomSanitizer) { }
  dataArr = [];

  ngOnInit() {
    this.bindVideos();
  }

  showPreview(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  bindVideos(){
    this.videoInfoService.getVideos().subscribe( res =>{
      this.dataArr = res;
    })
  }
}
