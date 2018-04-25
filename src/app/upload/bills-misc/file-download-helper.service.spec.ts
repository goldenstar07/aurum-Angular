import { TestBed, inject } from '@angular/core/testing';

import { FileDownloadHelperService } from './file-download-helper.service';

describe('FileDownloadHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileDownloadHelperService]
    });
  });

  it('should be created', inject([FileDownloadHelperService], (service: FileDownloadHelperService) => {
    expect(service).toBeTruthy();
  }));
});
