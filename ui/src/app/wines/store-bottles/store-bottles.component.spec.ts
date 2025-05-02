import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBottlesComponent } from './store-bottles.component';

describe('StoreBottlesComponent', () => {
  let component: StoreBottlesComponent;
  let fixture: ComponentFixture<StoreBottlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreBottlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreBottlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
