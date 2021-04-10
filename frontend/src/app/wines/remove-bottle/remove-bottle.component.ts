import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { flatMap, map, mergeMap } from 'rxjs/operators';
import { StorageInfo } from '../shared/models/storage-info.model';
import { VintageInfo } from '../shared/models/vintage-info.model';
import { VintageInfoService } from '../shared/services/vintage-info.service';
import { WineService } from '../shared/services/wine.service';

@Component({
  selector: 'app-remove-bottle',
  templateUrl: './remove-bottle.component.html',
  styleUrls: ['./remove-bottle.component.scss']
})
export class RemoveBottleComponent implements OnInit {
  public wineId: string;
  public vintageInfo$: Observable<VintageInfo[]>;
  public storageInfo$: Observable<StorageInfo[]>;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private wineService: WineService, private vintageInfoService: VintageInfoService,
    private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.wineId = this.activatedRoute.snapshot.params.wineId;
    this.vintageInfo$ = this.vintageInfoService.getAllVintageInfo(this.wineId);
    this.storageInfo$ = this.vintageInfo$.pipe(map((vintageInfoList: VintageInfo[]) =>
      vintageInfoList
        .filter((vintageInfo: VintageInfo) => vintageInfo.storageLocations.length > 0)
        .map((vintageInfo: VintageInfo) => this.buildStorageInfo(vintageInfo))));
  }

  public removeBottle(storageInfo: any): void { }

  ngOnInit(): void {
  }

  private buildStorageInfo(vintageInfo: VintageInfo): StorageInfo {
    return {
      vintage: vintageInfo.vintage,
      row: vintageInfo.storageLocations[0].row,
      shelf: vintageInfo.storageLocations[0].shelf
    };
  }
}
