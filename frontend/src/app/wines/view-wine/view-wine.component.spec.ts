import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWineComponent } from './view-wine.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { WineService } from '../shared/services/wine.service';
import { Wine } from '../shared/models/wine.model';
import { WineCategory } from '../shared/models/wine-category.model';

describe('ViewWineComponent', () => {
  let component: ViewWineComponent;
  let fixture: ComponentFixture<ViewWineComponent>;

  beforeEach(async () => {
    const wineServiceSpy = jasmine.createSpyObj('WineService', ['getWine', 'getWineCategories']);
    const wine: Wine = {
      _id: '', category: WineCategory.redWine, country: '', name: '',
      producer: '', region: '', image: '', vintageInfos: []
    };
    wineServiceSpy.getWine.and.returnValue(of(wine));

    const activatedRouteMock: ActivatedRoute = new ActivatedRoute();
    activatedRouteMock.snapshot = new ActivatedRouteSnapshot();
    activatedRouteMock.snapshot.params = { params: of({ wineId: '' }) };

    await TestBed.configureTestingModule({
      declarations: [ViewWineComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: WineService, useValue: wineServiceSpy },
        FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
