import {Component} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatToolbar} from "@angular/material/toolbar";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ThemeService} from "../shared/services/theme.service";
import {NgForOf} from "@angular/common";
import {Theme} from "../shared/models/theme.enum";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-settings',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    MatToolbar,
    FormsModule,
    ReactiveFormsModule,
    MatTooltip,
    MatIcon,
    MatIconButton,
    NgForOf
  ],
  templateUrl: './edit-settings.component.html',
  styleUrl: './edit-settings.component.scss'
})

export class EditSettingsComponent {
  protected settingsFormGroup!: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private themeService: ThemeService) {
    this.fillForm()
  }

  public get themeValues(): string[] {
    return Object.values(Theme)
  }

  public onSave(): void {
    const theme: Theme = this.themeService.getThemeEnumFromString(this.settingsFormGroup.value.theme);

    this.themeService.saveThemeToLocalStorage(theme);
    this.themeService.applyTheme(theme);

    this.snackBar.open($localize`Changes have been saved.`, undefined, {duration: 2000});
  }

  private fillForm(): void {
    const theme: string = this.themeService.loadThemeFromLocalStorage() ?? Theme.system;

    this.settingsFormGroup = this.formBuilder.group({
      theme: [theme],
    });
  }
}
