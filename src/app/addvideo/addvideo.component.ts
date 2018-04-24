import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { VideoInfoService } from '../video-info.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css']
})
export class AddvideoComponent implements OnInit {

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer,private videoInfo : VideoInfoService) { }
  videoForm;
  isShowSuccess: boolean = true;
  isShowError: boolean = true;
  videoPreview: SafeResourceUrl;
  ngOnInit() {
    this.videoForm = this.fb.group({
      'txtUrl': ['', Validators],
      'txtKeyWords': ['', Validators],
      'txtTime' : ['',Validators]
    })
  }

  get txtUrl(){
    return this.videoForm.controls.txtUrl;
  }

  get txtKeyWords() {
    return this.videoForm.controls.txtKeyWords;
  }

  get txtTime() {
    return this.videoForm.controls.txtTime;
  }

  showPreview(url){
    this.videoPreview = this.sanitizer.bypassSecurityTrustResourceUrl(url);    
  }

  submit(values){
    debugger;
    var arr = [];
    let arrVal = values.txtKeyWords;
    arr.push(arrVal);
    values.tags = arr;
    values.time = values.txtTime;
    values.url = values.txtUrl;

    this.videoInfo.saveVideo(values).subscribe( res => {
      console.log(res)
      if(res['message'] == 'saved'){
        this.showSuccessMessage();
        this.clearDetails();
      }
    })
  }

  showSuccessMessage(){
    window.scrollTo(500, 0);
    this.isShowSuccess = false;
    setTimeout(() => {
      this.isShowSuccess = true;
    }, 5000);
  }

  clearDetails(){
    this.videoPreview = this.sanitizer.bypassSecurityTrustResourceUrl('');
    this.videoForm.reset()
  }
}
