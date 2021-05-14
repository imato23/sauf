import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineListComponent } from './wine-list.component';
import { WineService } from '../shared/services/wine.service';
import { of } from 'rxjs';
import { Wine } from '../shared/models/wine.model';
import { WineCategory } from '../shared/models/wine-category.model';

describe('WineListComponent', () => {
  let component: WineListComponent;
  let fixture: ComponentFixture<WineListComponent>;
  let getWinesSpy: any;

  beforeEach(async () => {
    const wineServiceSpy = jasmine.createSpyObj('WineService', ['getWines']);
    getWinesSpy = wineServiceSpy.getWines.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [WineListComponent],
      providers: [{ provide: WineService, useValue: wineServiceSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
