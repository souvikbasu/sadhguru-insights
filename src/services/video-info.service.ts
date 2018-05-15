import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class VideoInfoService {
  headers;
  apiUrl: string = environment.apiUrl;
  public dataId: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private http: Http) { }

  saveVideo(value) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + '/video', value, { headers: this.headers })
      .map(res => res.json()
    );
  }

  getTags() {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + '/tags', { headers: this.headers })
      .map(res => res.json()
      );
  }

  getVideo(value) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + '/videos?tag=' + value, { headers: this.headers })
      .map(res => res.json()
      );
  }

  getVideoById(value) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + '/videos?_id=' + value, { headers: this.headers })
      .map(res => res.json()
      );
  }
  
  updateVideo(value) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + '/videos', value, { headers: this.headers })
      .map(res => res.json()
      );
  }

  deleteVideo(value) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.apiUrl + '/videos?_id=' + value, { headers: this.headers })
      .map(res => res.json()
      );
  }

  sendDataId(value: any) {
    this.dataId.next(value);
  }
}
