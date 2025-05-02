import { TestBed } from '@angular/core/testing';

import { VintageInfoService } from './vintage-info.service';
import { HttpClient } from '@angular/common/http';

describe('VintageInfoService', () => {
  let service: VintageInfoService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(VintageInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
