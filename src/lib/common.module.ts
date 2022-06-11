import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizePipe } from './pipes';
import { BusyDirective, AccessibleDirective, EqualValidator } from './directive';
import { TypeaheadControlComponent } from './components';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const COMMON_COMPONENTS = [TypeaheadControlComponent];

@NgModule({
  imports: [
    AngularCommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule,
  ],
  declarations: [
    LocalizePipe,
    BusyDirective,
    AccessibleDirective,
    EqualValidator,
    ...COMMON_COMPONENTS
  ],
  exports: [
    LocalizePipe,
    BusyDirective,
    AccessibleDirective,
    EqualValidator,
    ...COMMON_COMPONENTS
  ]
})
export class CommonModule {
  static forRoot(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: []
    };
  }
  static forFeature(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: []
    };
  }
}
