import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { VideoInfoService } from '../../services/video-info.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit, OnChanges {

  constructor(private videoInfoService: VideoInfoService, public sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router) { }
  dataArr : any;
  isShowSuccess: boolean = true;
  isShowError: boolean = true;
  isMsgText: string;
  @Input() tabVal;
  ngOnInit() {
    debugger;
    this.bindVideos();
  }

  ngOnChanges() {
    if (this.tabVal == 0) {
      this.bindVideos();
    }
  }

  bindVideos() {
    this.videoInfoService.getVideo('').subscribe(res => {
      this.dataArr = res;
    });
  }

  showPreview(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ifAvailable(value){
    if(value == null || value == ""){
      return 'N/A';
    }
    else{
      return value;
    }
  }

  editVideo(dataId){
    this.videoInfoService.sendDataId(dataId);
    this.toggleAddUpdateTab('update');
  }

  deleteVideo(dataId) {
    this.videoInfoService.deleteVideo(dataId).subscribe( res =>{
      this.showSuccessMessage('Deleted');
      this.bindVideos();
    })
  }

  toggleAddUpdateTab(tabType) {
    if (tabType == 'update') {
      let tab = document.getElementsByClassName('mat-tab-label')[1] as HTMLElement;
      tab.click();
      var tabText = tab.getElementsByClassName('mat-tab-label-content')[0] as HTMLElement;
      tabText.innerText = 'Update Videos';
    }
    else {
      let tab = document.getElementsByClassName('mat-tab-label')[1] as HTMLElement;
      tab.click();
      var tabText = tab.getElementsByClassName('mat-tab-label-content')[0] as HTMLElement;
      tabText.innerText = 'Add Videos';
    }
  }

  showSuccessMessage(value) {
    window.scrollTo(500, 0);
    this.isShowSuccess = false;
    this.isMsgText = value;
    setTimeout(() => {
      this.isShowSuccess = true;
    }, 5000);
  }

  showErrorMessage() {
    window.scrollTo(500, 0);
    this.isShowError = false;
    setTimeout(() => {
      this.isShowError = true;
    }, 5000);
  }
}
