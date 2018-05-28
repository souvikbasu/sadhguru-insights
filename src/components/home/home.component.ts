import { Component, OnInit } from '@angular/core';
import { VideoInfoService } from '../../services/video-info.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private videoInfoService: VideoInfoService, public sanitizer: DomSanitizer) { }
  dataArr = [];
  buttonArr = [];
  p: number = 1;
  ngOnInit() {
    this.bindVideos();
  }

  showPreview(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  bindVideos() {
    this.videoInfoService.getTags().subscribe( res => {
      this.buttonArr = res;
      setTimeout(() => {
        this.getVideo(res[0], 0);
      }, 1000);
    });
  }

  getVideo(value, index)  {
    this.addCssButtons(document.getElementsByClassName('myHomeBtn'));
    const btn = document.getElementsByClassName('myHomeBtn')[index];
    btn['style']['background'] = '#af87f7';
    this.videoInfoService.getVideo(value).subscribe( res => {
      this.dataArr = res;
    });
  }

  addCssButtons(allBtn){
    for (let i = 0; i < allBtn.length; i++){
      const btn = allBtn[i];
      btn['style']['background'] = '#673ab7';
    }
  }
}
