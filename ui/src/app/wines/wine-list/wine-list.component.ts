import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { Wine } from '../shared/models/wine.model';
import { FilterItem } from '../shared/models/filter-item.model';
import { WineCategory } from '../shared/models/wine-category.model';
import { WineService } from '../shared/services/wine.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatList } from '@angular/material/list';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-wine-list',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatDivider,
    MatMenu,
    AsyncPipe,
    RouterLink,
    NgIf,
    NgForOf,
    MatFabButton,
    MatMenuItem,
    MatList,

  ],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.scss',
})
export class WineListComponent {
  @ViewChild('searchField') searchField!: ElementRef;
  public wines$: Observable<Wine[]> = of([]);
  public dummyAvatar: string = 'assets/no-wine-photo-avatar.png';
  public isSearchActive: boolean = false;
  public searchControl: UntypedFormControl = new UntypedFormControl('');
  public filterItems: FilterItem[] = [
    { displayName: 'Alle', searchPattern: '', selected: true },
    { displayName: this.translateWineCategory(WineCategory.RedWine), searchPattern: 'rotwein', selected: false },
    { displayName: this.translateWineCategory(WineCategory.RoseWine), searchPattern: 'rosewein', selected: false },
    { displayName: this.translateWineCategory(WineCategory.WhiteWine), searchPattern: 'weißwein', selected: false },
    {
      displayName: this.translateWineCategory(WineCategory.SparklingWine),
      searchPattern: 'schaumwein',
      selected: false,
    },
  ];

  public isFilterActive$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private wineService: WineService) {
    this.wines$ = this.processSearchPattern(this.searchControl.valueChanges);
  }

  public onfilterItemSelected(item: FilterItem): void {
    for (const filterItem of this.filterItems) {
      filterItem.selected = false;
    }

    item.selected = true;

    this.isFilterActive$.next(item.displayName !== 'Alle');

    this.wines$ = this.filterWines(item.searchPattern);
  }

  public onActivateSearch(): void {
    this.isSearchActive = true;
    setTimeout(() => this.searchField.nativeElement.focus(), 0);
  }

  private processSearchPattern(searchPatterns$: Observable<string>): Observable<Wine[]> {
    return searchPatterns$.pipe(
      startWith(''),
      //debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterWines(term)));
  }

  private filterWines(searchPattern: string): Observable<Wine[]> {
    return this.wineService.getWines().pipe(
      map((wines: Wine[]) => wines.filter((wine: Wine) =>
        searchPattern === '' ||
        wine.name.toLowerCase().includes(searchPattern.toLowerCase()) ||
        this.translateWineCategory(wine.category).toLowerCase().includes(searchPattern.toLowerCase()) ||
        wine.producer.toLowerCase().includes(searchPattern.toLowerCase()),
      )));
  }

  private translateWineCategory(category: WineCategory): string {
    switch (category) {
      case WineCategory.RedWine:
        return 'Rotwein';
      case WineCategory.WhiteWine:
        return 'Weißwein';
      case WineCategory.RoseWine:
        return 'Rosewein';
      case WineCategory.SparklingWine:
        return 'Schaumwein';
      default:
        throw Error(`The wine category '${category}' is unknown.`);
    }
  }
}
