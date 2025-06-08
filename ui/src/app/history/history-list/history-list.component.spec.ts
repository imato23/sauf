import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryListComponent} from './history-list.component';

describe('HistoryComponent', () => {
  let component: HistoryListComponent;
  let fixture: ComponentFixture<HistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
