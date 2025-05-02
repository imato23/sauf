import { TestBed } from '@angular/core/testing';

import { WineService } from './wine.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('WineService', () => {
  let service: WineService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });

    service = TestBed.inject(WineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call rest api if getWines is triggered', () => {
    service.getWines();
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(`${environment.apiUrl}/wines`);
  });

  it('should call rest api if getWine is triggered', () => {
    const id = 'myId';
    service.getWine(id);
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(`${environment.apiUrl}/wines/${id}`);
  });
});
