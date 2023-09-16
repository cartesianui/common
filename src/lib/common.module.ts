import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizePipe, TimeSincePipe } from './pipes';
import { BusyDirective, AccessibleDirective } from './directive';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatetimeService } from './services';
import { LookupWidgetComponent } from './widgets';
import { BaseComponent } from './components';

const WIDGET_COMPONENTS = [LookupWidgetComponent];
const COMMON_COMPONENTS = [BaseComponent, ...WIDGET_COMPONENTS] as any;

@NgModule({
  imports: [AngularCommonModule, RouterModule, FormsModule, ReactiveFormsModule, TypeaheadModule, NgxDatatableModule],
  declarations: [LocalizePipe, TimeSincePipe, BusyDirective, AccessibleDirective, ...COMMON_COMPONENTS],
  exports: [LocalizePipe, TimeSincePipe, BusyDirective, AccessibleDirective, ...COMMON_COMPONENTS]
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
