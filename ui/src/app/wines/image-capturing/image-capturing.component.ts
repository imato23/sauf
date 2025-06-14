import {Component, HostListener, OnInit} from '@angular/core';
import {WebcamImage, WebcamModule} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-image-capturing',
  imports: [
    WebcamModule,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './image-capturing.component.html',
  styleUrl: './image-capturing.component.scss',
})
export class ImageCapturingComponent implements OnInit {
  public webcamImage: WebcamImage | null = null;
  public webcamWidth = 1600;
  public webcamHeight = 1200;
  private trigger: Subject<void> = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<ImageCapturingComponent>) {
    console.log(`Webcam Width: ${this.webcamWidth}, Height: ${this.webcamHeight}`);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  @HostListener('window:resize')
  setFullscreenSize() {
    this.webcamWidth = Math.round(window.innerWidth * 0.9);
    this.webcamHeight = Math.round(window.innerHeight * 0.9);

    console.log(`Webcam Width: ${this.webcamWidth}, Height: ${this.webcamHeight}`);
  }

  ngOnInit(): void {
    this.setFullscreenSize();
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
