import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideoInfoService {
  headers;
  constructor(private http: Http) { }

  saveVideo(value) {
    debugger;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/video', value, { headers: this.headers })
      .map(res => res.json()
    );
  }

  getVideos() {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('http://localhost:3000/video', { headers: this.headers })
      .map(res => res.json()
      );
  }
}
