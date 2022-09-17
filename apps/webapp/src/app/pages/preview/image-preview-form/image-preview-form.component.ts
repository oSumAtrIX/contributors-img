import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Repository } from '../../../models/repository';
import { PreviewStore } from '../preview.store';

@Component({
  selector: 'app-image-preview-form',
  template: `
    <div class="controlPane">
      <form class="repositoryForm" [formGroup]="form">
        <mat-form-field appearance="outline" class="--no-hint" style="width: 320px">
          <mat-label>Enter GitHub Repository</mat-label>
          <input matInput name="repository" placeholder="e.g. angular/angular-ja" formControlName="repository" />
        </mat-form-field>
        <button type="submit" (click)="generateImage()" mat-raised-button color="primary" [disabled]="form.invalid">
          Generate
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./image-preview-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class ImagePreviewFormComponent {
  @Input()
  set repository(value: Repository | null) {
    this.form.patchValue({ repository: value ? value.toString() : null });
  }

  readonly form = new FormGroup({
    repository: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  private readonly store = inject(PreviewStore);

  generateImage() {
    const repoName = this.form.value.repository;

    this.store.updateImageParams({
      repository: repoName ? Repository.fromString(repoName) : null,
    });
  }
}