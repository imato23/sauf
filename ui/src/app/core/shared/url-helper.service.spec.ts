import { TestBed } from '@angular/core/testing';

import { UrlHelperService } from './url-helper.service';

describe('UrlHelperService', () => {
  let service: UrlHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
