import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";
import {WineService} from "../shared/services/wine.service";
import {debounceTime, Observable} from "rxjs";
import {NgxTrimDirectiveModule} from "ngx-trim-directive";
import {WineListFilter} from "../shared/models/wine-list.filter.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  imports: [
    FormsModule,
    MatInput,
    MatLabel,
    MatSelect,
    NgForOf,
    MatFormField,
    MatOption,
    AsyncPipe,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    MatSlideToggle,
    MatFormField,
  ],
  selector: 'app-wine-list-filter',
  styleUrl: './wine-list-filter.component.scss',
  templateUrl: './wine-list-filter.component.html'
})
export class WineListFilterComponent implements OnInit {
  @Output() filterChanged: EventEmitter<WineListFilter> = new EventEmitter<WineListFilter>();

  public wineListFilterFormGroup: UntypedFormGroup;
  public allWineCategories$: Observable<string[]>;
  public allProducers$: Observable<string[]>;

  public constructor(private wineService: WineService, private formBuilder: UntypedFormBuilder) {
    this.allProducers$ = this.wineService.getAllProducers();
    this.allWineCategories$ = this.wineService.getWineCategories();

    this.wineListFilterFormGroup = this.formBuilder.group({
      wineName: [null],
      producer: ['all'],
      category: ['all'],
      onlyAvailableWines: [true]
    });

    this.wineListFilterFormGroup.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe((filter: WineListFilter) => {
        console.info(filter);
        this.emitFilter(filter);
      })
  }

  ngOnInit(): void {
    this.emitFilter(this.wineListFilterFormGroup.value);
  }

  private emitFilter(filter: WineListFilter) {
    if (filter.category === 'all') {
      filter.category = null;
    }
    if (filter.producer === 'all') {
      filter.producer = null;
    }
    if (filter.wineName === '') {
      filter.wineName = null;
    }

    this.filterChanged.emit(filter);
  }
}
