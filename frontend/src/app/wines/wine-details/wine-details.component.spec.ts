import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDetailsComponent } from './wine-details.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { WineService } from '../shared/services/wine.service';
import { Wine } from '../shared/models/wine.model';
import { WineCategory } from '../shared/models/wine-category.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WineDetailsComponent', () => {
  let component: WineDetailsComponent;
  let fixture: ComponentFixture<WineDetailsComponent>;

  beforeEach(async () => {
    const wineServiceSpy = jasmine.createSpyObj('WineService', ['getWine', 'getWineCategories']);
    const wine: Wine = {
      _id: '', category: WineCategory.redWine, country: '', name: '',
      producer: '', region: '', image: '', vintageInfos: [], bottleCount: 0
    };
    wineServiceSpy.getWine.and.returnValue(of(wine));

    const activatedRouteMock: ActivatedRoute = new ActivatedRoute();
    activatedRouteMock.snapshot = new ActivatedRouteSnapshot();
    activatedRouteMock.snapshot.params = { params: of({ wineId: '' }) };

    await TestBed.configureTestingModule({
      declarations: [WineDetailsComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: WineService, useValue: wineServiceSpy },
        FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
