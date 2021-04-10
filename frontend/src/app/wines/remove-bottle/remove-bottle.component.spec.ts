import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBottleComponent } from './remove-bottle.component';

describe('RemoveBottleComponent', () => {
  let component: RemoveBottleComponent;
  let fixture: ComponentFixture<RemoveBottleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveBottleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
