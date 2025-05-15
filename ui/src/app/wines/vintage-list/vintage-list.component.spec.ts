import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageListComponent } from './vintage-list.component';

describe('VintageListComponent', () => {
  let component: VintageListComponent;
  let fixture: ComponentFixture<VintageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VintageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VintageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
