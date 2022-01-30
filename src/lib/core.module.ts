import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { LocalizePipe } from './pipes';
import { BusyDirective, AccessibleDirective, EqualValidator } from './directive'
import {
  AppPaginationControlsComponent,
  AppValidationSummaryComponent,
  AppModalHeaderComponent,
  AppModalFooterComponent,
  DefaultLayoutComponent,
} from './ui';

// Import 3rd party components
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

const CORE_UI_COMPONENT = [
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
];
const APP_LAYOUTS = [ DefaultLayoutComponent ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ...CORE_UI_COMPONENT,
  ],
  declarations: [
    AppPaginationControlsComponent,
    AppValidationSummaryComponent,
    AppModalHeaderComponent,
    AppModalFooterComponent,
    LocalizePipe,
    BusyDirective,
    AccessibleDirective,
    EqualValidator,
    ...APP_LAYOUTS,
  ],
  exports: [
    AppPaginationControlsComponent,
    AppValidationSummaryComponent,
    AppModalHeaderComponent,
    AppModalFooterComponent,
    LocalizePipe,
    BusyDirective,
    AccessibleDirective,
    EqualValidator,
    ...APP_LAYOUTS,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
