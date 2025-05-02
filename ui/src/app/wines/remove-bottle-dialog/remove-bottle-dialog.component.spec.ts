import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBottleDialogComponent } from './remove-bottle-dialog.component';

describe('RemoveBottleDialogComponent', () => {
  let component: RemoveBottleDialogComponent;
  let fixture: ComponentFixture<RemoveBottleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveBottleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveBottleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
