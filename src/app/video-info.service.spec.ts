import { TestBed, inject } from '@angular/core/testing';

import { VideoInfoService } from './video-info.service';

describe('VideoInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoInfoService]
    });
  });

  it('should be created', inject([VideoInfoService], (service: VideoInfoService) => {
    expect(service).toBeTruthy();
  }));
});
