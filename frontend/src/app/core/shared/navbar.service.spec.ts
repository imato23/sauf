import { TestBed } from '@angular/core/testing';

import { NavbarService } from './navbar.service';
import { BreakpointObserver } from '@angular/cdk/layout';

describe('NavbarService', () => {
  let service: NavbarService;
  let breakpointObserverSpy: any;

  beforeEach(() => {
    breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['get']);
    TestBed.configureTestingModule({
      providers: [{ provide: BreakpointObserver, useValue: breakpointObserverSpy }]
    });
    service = TestBed.inject(NavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inform subscribers of navbarToggleRequested observable if toogleNavbar is triggered', () => {
    const expectedCount = 1;
    let actualCount = 0;

    service.navbarToggleRequested$.subscribe(() => actualCount++);

    service.toogleNavbar();

    expect(actualCount).toBe(expectedCount);
  });
});
