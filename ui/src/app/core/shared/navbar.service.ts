import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarToggleRequested: Subject<void> = new Subject<void>();

  public get navbarToggleRequested$(): Observable<void> {
    return this.navbarToggleRequested.asObservable();
  }

  constructor() { }

  public toggleNavbar(): void {
    this.navbarToggleRequested.next();
  }
}
