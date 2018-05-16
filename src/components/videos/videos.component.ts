import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  constructor() { }
  tabValue : string;

  ngOnInit() {
  }
  
  showContent(value){
    this.tabValue = value.index;
    if(value.index == 0){
      let tab = document.getElementsByClassName('mat-tab-label')[value.index + 1];
      var tabText = tab.getElementsByClassName('mat-tab-label-content')[0] as HTMLElement;
      tabText.innerText = 'Add Videos';
    }
  }
}
