import { Component, OnInit } from '@angular/core';
import { VideoInfoService } from '../../services/video-info.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {

  constructor(private videoInfoService: VideoInfoService, public sanitizer: DomSanitizer) { }
  dataArr : any;
  ngOnInit() {
    debugger;
    this.bindVideos();
  }

  bindVideos() {
    this.videoInfoService.getVideo('').subscribe(res => {
      debugger;
      this.dataArr = res;
      console.log(this.dataArr);
    });
  }

  showPreview(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ifAvailable(value){
    debugger;
    if(value == null || value == ""){
      return 'N/A';
    }
    else{
      return value;
    }
  }

  editVideo(dataId){
    debugger;
  }

  deleteVideo(dataId) {
    debugger;
  }
}
