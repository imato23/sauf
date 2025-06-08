import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
import {Wine} from '../shared/models/wine.model';
import {StorageInfo} from '../shared/models/storage-info.model';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {WineService} from '../shared/services/wine.service';
import {VintageInfoService} from '../shared/services/vintage-info.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VintageInfo} from '../shared/models/vintage-info.model';
import {RemoveBottleDialogComponent} from '../remove-bottle-dialog/remove-bottle-dialog.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatActionList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-remove-bottle',
  imports: [
    MatToolbar,
    RouterLink,
    MatIcon,
    AsyncPipe,
    MatDivider,
    MatButton,
    MatActionList,
    MatListItem,
    MatIconButton,

  ],
  templateUrl: './remove-bottle.component.html',
  styleUrl: './remove-bottle.component.scss',
})
export class RemoveBottleComponent implements OnInit {
  public wineId: string;
  public wine$: Observable<Wine>;
  public storageInfo$: Observable<StorageInfo[]>;
  public bottlesAvailable$: Observable<boolean>;
  private readonly refreshToken$: BehaviorSubject<undefined> = new BehaviorSubject(undefined);

  constructor(private activatedRoute: ActivatedRoute, private wineService: WineService,
              private vintageInfoService: VintageInfoService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.wineId = this.activatedRoute.snapshot.params['wineId'];

    this.wine$ = this.wineService.getWine(this.wineId);

    this.storageInfo$ = this.refreshToken$.pipe(
      switchMap(() =>
        this.vintageInfoService.getAllVintageInfo(this.wineId)
          .pipe(
            map((vintageInfoList: VintageInfo[]) =>
              vintageInfoList
                .filter((vintageInfo: VintageInfo) => vintageInfo.storageLocations.length > 0)
                .map((vintageInfo: VintageInfo) => this.buildStorageInfo(vintageInfo))))));


    this.bottlesAvailable$ = this.storageInfo$.pipe(map((storageInfoList: StorageInfo[]) => storageInfoList.length > 0));
  }

  public showRemoveBottleDialog(storageInfo: StorageInfo): void {
    const dialogRef = this.dialog.open(RemoveBottleDialogComponent, {
      data: {row: storageInfo.row, shelf: storageInfo.shelf},
    });

    dialogRef.afterClosed().subscribe((removalApproved: boolean) => {
      if (!removalApproved) {
        return;
      }

      this.vintageInfoService.removeBottle(
        this.wineId,
        storageInfo.vintage as number,
        {row: storageInfo.row, shelf: storageInfo.shelf}).subscribe(() => {
        this.refreshToken$.next(undefined);
        this.snackBar.open($localize`The wine bottle has been removed.`,
          undefined, {duration: 2000});
      });
    });
  }

  ngOnInit(): void {
  }

  private buildStorageInfo(vintageInfo: VintageInfo): StorageInfo {
    return {
      vintage: vintageInfo.vintage,
      row: vintageInfo.storageLocations[0].row,
      shelf: vintageInfo.storageLocations[0].shelf,
      bottleCount: vintageInfo.bottleCount,
    };
  }
}

