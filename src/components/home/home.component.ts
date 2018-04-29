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

  ngOnInit() {
    this.bindVideos();
  }

  showPreview(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  bindVideos(){
    this.videoInfoService.getTags().subscribe( res =>{
      let dataArr = res.map(function(data) {
        return data['tags'];
      })
      var mergedArr = [].concat.apply([], dataArr);      
      let uniqueArray = mergedArr.filter(function (item, pos) {
        return mergedArr.indexOf(item) == pos;
      })
      this.buttonArr = uniqueArray;
      setTimeout(() => {
        this.getVideo(uniqueArray[0], 0);
      }, 1000);
      
    })
  }

  getVideo(value,index){
    this.addCssButtons(document.getElementsByClassName('myHomeBtn'));
    var btn = document.getElementsByClassName('myHomeBtn')[index];
    btn['style']['background'] = '#af87f7';
    this.videoInfoService.getVideo(value).subscribe( res => {
      this.dataArr = res;
    })
  }

  addCssButtons(allBtn){
    for(var i = 0; i < allBtn.length; i++){
      var btn = allBtn[i];
      btn['style']['background'] = '#673ab7';
    }
  }
}
