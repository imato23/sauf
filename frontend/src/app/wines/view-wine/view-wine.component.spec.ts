import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWineComponent } from './view-wine.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

describe('ViewWineComponent', () => {
  let component: ViewWineComponent;
  let fixture: ComponentFixture<ViewWineComponent>;

  beforeEach(async () => {
    const activatedRouteMock: ActivatedRoute = new ActivatedRoute();
    activatedRouteMock.snapshot = new ActivatedRouteSnapshot();
    activatedRouteMock.snapshot.params = { params: of({ wineId: '' }) };

    await TestBed.configureTestingModule({
      declarations: [ViewWineComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    })
      .compileComponents();
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
