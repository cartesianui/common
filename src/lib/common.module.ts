import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizePipe } from './pipes';
import { BusyDirective, AccessibleDirective, EqualValidator } from './directive';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatetimeService } from './services';
import { LookupWidgetComponent } from './widgets';

const COMMON_COMPONENTS = [];
const WIDGET_COMPONENTS = [LookupWidgetComponent];

@NgModule({
  imports: [AngularCommonModule, RouterModule, FormsModule, ReactiveFormsModule, TypeaheadModule, NgxDatatableModule],
  declarations: [LocalizePipe, BusyDirective, AccessibleDirective, EqualValidator, ...COMMON_COMPONENTS, ...WIDGET_COMPONENTS],
  exports: [LocalizePipe, BusyDirective, AccessibleDirective, EqualValidator, ...COMMON_COMPONENTS, ...WIDGET_COMPONENTS]
})
export class CommonModule {
  static forRoot(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: [DatetimeService]
    };
  }
  static forFeature(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: [DatetimeService]
    };
  }
}
