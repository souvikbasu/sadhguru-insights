import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { VideoInfoService } from '../../services/video-info.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css']
})
export class AddvideoComponent implements OnInit, OnChanges {

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer,private videoInfo : VideoInfoService) { }
  videoForm;
  isShowSuccess: boolean = true;
  isShowError: boolean = true;
  videoPreview: SafeResourceUrl;
  videoId : string;
  isUpdate = true;
  isShow = false;
  tabValue : string;
  isMsgText : string;
  buttonArr : any;
  @Input() tabVal;
  ngOnInit() {
    this.videoForm = this.fb.group({
      'txtUrl': ['', Validators],
      'txtKeyWords': ['', Validators],
      'txtTime' : ['',Validators]
    })
    this.getTags();
    this.bindUpdateData();
  }

  ngOnChanges() {
    if (this.tabVal == 1) {
      this.tabValue = this.tabVal['txtval'];
      this.clearDetails();   
      this.isUpdate = true;
      this.isShow = false;
    }
  }

  bindUpdateData(){
    this.videoInfo.dataId.subscribe(res => {
      this.videoInfo.getVideoById(res).subscribe( res =>{
        console.log(res);
        this.videoForm.controls['txtUrl'].setValue(res[0]['url']);
        this.videoPreview = this.sanitizer.bypassSecurityTrustResourceUrl(res[0]['url']);
        this.videoForm.controls['txtKeyWords'].setValue(res[0]['tags']);
        this.videoForm.controls['txtTime'].setValue(res[0]['time']);
        this.videoId = res[0]['_id'];
        this.isUpdate = false;
        this.isShow = true;
      });
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
    let splittedUrl = url.split('watch?v=');
    let newUrl = splittedUrl.join('embed/');
    this.videoPreview = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);    
  }

  submit(values){
    if (values.txtUrl == ""){
      this.showErrorMessage();
      return false;
    }
    let arrVal = values.txtKeyWords;
    let arr = arrVal.split(',');

    let formattedArr = arr.map(function(data){
      let value = data.trim();
      //value = value.toLocaleLowerCase();
      return value;
    })

    let splittedUrl = values.txtUrl.split('watch?v=');
    let newUrl = splittedUrl.join('embed/');
    

    let startTime = values.txtTime;

    if (values.txtTime != ""){
      let time = values.txtTime;
      time = time.split(':');
      let hh = time[0];
      let mm = time[1];
      let ss = time[2];
      startTime = (parseInt(hh) * 60 * 60) + (parseInt(mm) * 60) + parseInt(ss);
      newUrl = newUrl + '?start=' + startTime;
    }

    values.tags = formattedArr;
    values.time = startTime;
    values.url = newUrl;

    //return false;
    this.videoInfo.saveVideo(values).subscribe( res => {
      console.log(res)
      if(res['message'] == 'saved'){
        this.showSuccessMessage('Saved');
        this.clearDetails();
        let tab = document.getElementsByClassName('mat-tab-label')[0] as HTMLElement;
        tab.click();
        var tabText = tab.getElementsByClassName('mat-tab-label-content')[0];
      }
    })
  }

  update(values, dataId){
    let tagArr = [];
    let arrVal = values.txtKeyWords;
    if (Array.isArray(arrVal) == true){
      tagArr = arrVal;
    }
    else{
      let arr = arrVal.split(',');
      let formattedArr = arr.map(function (data) {
        let value = data.trim();
        value = value.toLocaleLowerCase();
        return value;
      })
      tagArr = formattedArr;
    }        

    values.tags = tagArr;
    values.time = values.txtTime;
    values.url = values.txtUrl;
    values._id = dataId;

    this.videoInfo.updateVideo(values).subscribe( res => {
      if (res['message'] == 'updated') {
        this.showSuccessMessage('Update');
        this.clearDetails();
        let tab = document.getElementsByClassName('mat-tab-label')[0] as HTMLElement;
        tab.click();
        var tabText = tab.getElementsByClassName('mat-tab-label-content')[0];
      }
    })
  }

  getTags(){
    this.videoInfo.getTags().subscribe( res =>{
      this.buttonArr = res;
    })
  }

  showSuccessMessage(value){
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

  clearDetails(){
    this.videoPreview = this.sanitizer.bypassSecurityTrustResourceUrl('');
    this.videoForm.reset()
  }
}
