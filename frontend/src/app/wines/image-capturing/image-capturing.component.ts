import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-image-capturing',
  templateUrl: './image-capturing.component.html',
  styleUrls: ['./image-capturing.component.scss']
})
export class ImageCapturingComponent implements OnInit {
  public webcamImage: WebcamImage | null = null;
  public webcamWidth = window.innerWidth - 150;
  public webcamHeight = window.innerHeight - 150;
  private trigger: Subject<void> = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<ImageCapturingComponent>) { }

  ngOnInit(): void {
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public onTriggerSnapshot(): void {
    this.trigger.next();
  }

  public onCaptureImage(image: WebcamImage): void {
    this.webcamImage = image;
  }

  public onRetry(): void {
    this.webcamImage = null;
  }

  public onApply(): void {
    this.dialogRef.close(this.webcamImage);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
