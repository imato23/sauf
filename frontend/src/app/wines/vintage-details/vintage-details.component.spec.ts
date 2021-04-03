import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageDetailsComponent } from './vintage-details.component';

describe('VintageDetailsComponent', () => {
  let component: VintageDetailsComponent;
  let fixture: ComponentFixture<VintageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VintageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VintageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
