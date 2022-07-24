import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavbarService } from 'src/app/core/shared/navbar.service';
import { ThemeService } from 'src/app/shared/theme.service';
import {StyleManagerService} from '../../shared/style-manager.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public availableThemes: string[] = [];

  public settingsFormGroup: FormGroup;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private themeService: ThemeService,
    private styleManager: StyleManagerService,
    private formBuilder: FormBuilder,
    private navbarService: NavbarService,
    private breakpointObserver: BreakpointObserver) {
    this.settingsFormGroup = this.formBuilder.group({
      theme: ['', Validators.required],
    });

    this.availableThemes = ['Light', 'Dark'];
    this.settingsFormGroup.setValue({ theme: themeService.getCurrentTheme() });
  }

  get themeFormItem(): AbstractControl | null {
    return this.settingsFormGroup.get('theme');
  }

  ngOnInit(): void {
  }

  public onToggleNavbar(): void {
    this.navbarService.toogleNavbar();
  }

  public onSave(): void {
    this.styleManager.toggleDarkTheme();
  }
}
