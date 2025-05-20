import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineListFilterComponent } from './wine-list-filter.component';

describe('WineListFilterComponent', () => {
  let component: WineListFilterComponent;
  let fixture: ComponentFixture<WineListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineListFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
