import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StorageInfo } from '../shared/models/storage-info.model';
import { VintageInfo } from '../shared/models/vintage-info.model';
import { VintageInfoService } from '../shared/services/vintage-info.service';
import { RemoveBottleDialogComponent } from '../remove-bottle-dialog/remove-bottle-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remove-bottle',
  templateUrl: './remove-bottle.component.html',
  styleUrls: ['./remove-bottle.component.scss']
})
export class RemoveBottleComponent implements OnInit {
  public wineId: string;
  public storageInfo$: Observable<StorageInfo[]>;
  private readonly refreshToken$ = new BehaviorSubject(undefined);

  constructor(private activatedRoute: ActivatedRoute, private vintageInfoService: VintageInfoService,
    private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.wineId = this.activatedRoute.snapshot.params.wineId;

    this.storageInfo$ = this.refreshToken$.pipe(switchMap(() =>
      this.vintageInfoService.getAllVintageInfo(this.wineId)
        .pipe(map((vintageInfoList: VintageInfo[]) =>
          vintageInfoList
            .filter((vintageInfo: VintageInfo) => vintageInfo.storageLocations.length > 0)
            .map((vintageInfo: VintageInfo) => this.buildStorageInfo(vintageInfo))))));
  }

  public showRemoveBottleDialog(storageInfo: StorageInfo): void {
    const dialogRef = this.dialog.open(RemoveBottleDialogComponent, {
      data: { row: storageInfo.row, shelf: storageInfo.shelf }
    });

    dialogRef.afterClosed().subscribe((removalApproved: boolean) => {
      if (!removalApproved) {
        return;
      }

      this.vintageInfoService.removeBottle(
        this.wineId,
        storageInfo.vintage as number,
        { row: storageInfo.row, shelf: storageInfo.shelf }).subscribe(() => {
          this.refreshToken$.next(undefined);
          this.snackBar.open($localize`:@@WineBottleRemoved: The wine bottle has been removed.`, undefined, { duration: 2000 });
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
      bottleCount: vintageInfo.bottleCount
    };
  }
}
