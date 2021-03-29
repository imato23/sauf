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

  it('hould calcalute the number of wine bottles if getWines is triggered', () => {
    const wine: Wine = {
      _id: '', name: '', producer: '', region: '',
      country: '', category: WineCategory.redWine, image: null,
      vintageInfos: [{
        vintage: 2020, numberOfBottles: 5, price: 0, alcoholicStrength: 0,
        residualSugar: 0, tartaricAcid: 0, storageLocations: []
      }, {
        vintage: 2019, numberOfBottles: 3, price: 0, alcoholicStrength: 0,
        residualSugar: 0, tartaricAcid: 0, storageLocations: []
      }]
    };

    const expected = 8;
    const actual: number = component.getNumberOfBottles(wine);

    expect(actual).toBe(expected);
    expect(getWinesSpy.calls.any()).toBe(true, 'getWines called');
  });
});
