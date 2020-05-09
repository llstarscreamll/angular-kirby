import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NoveltyFormComponent } from './novelty-form/novelty-form.component';
import { CreateNoveltiesToEmployeesFormComponent } from './create-novelties-to-employees-form/create-novelties-to-employees-form.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  declarations: [NoveltyFormComponent, CreateNoveltiesToEmployeesFormComponent],
  exports: [NoveltyFormComponent, CreateNoveltiesToEmployeesFormComponent]
})
export class NoveltiesUiModule {}
