import { Injector, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  AppConstants,
  LocalizationService,
  PermissionCheckerService,
  FeatureCheckerService,
  NotifyService,
  SettingService,
  MessageService,
  TenancyService,
  UiService,
  SessionService
} from '@cartesianui/core';
import { FormValidatorService } from '@cartesianui/forms';

export abstract class BaseComponent {
  localizationSourceName = AppConstants.localization.defaultLocalizationSourceName;

  localization: LocalizationService;
  permissionCheckerService: PermissionCheckerService;
  feature: FeatureCheckerService;
  notify: NotifyService;
  ui: UiService;
  setting: SettingService;
  message: MessageService;
  tenancy: TenancyService;
  appSession: SessionService;
  elementRef: ElementRef;
  subscriptions: Array<Subscription> = [];
  formValidator: FormValidatorService;

  constructor(injector: Injector) {
    this.localization = injector.get(LocalizationService);
    this.permissionCheckerService = injector.get(PermissionCheckerService);
    this.feature = injector.get(FeatureCheckerService);
    this.notify = injector.get(NotifyService);
    this.ui = injector.get(UiService);
    this.setting = injector.get(SettingService);
    this.message = injector.get(MessageService);
    this.tenancy = injector.get(TenancyService);
    this.appSession = injector.get(SessionService);
    this.formValidator = injector.get(FormValidatorService);
    this.elementRef = injector.get(ElementRef);
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this.localization.localize(key, this.localizationSourceName);

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    args.unshift(localizedText);
    return axis.utils.formatString.apply(this, args);
  }

  isGranted(permissionName: string): boolean {
    return this.permissionCheckerService.isGranted(permissionName);
  }

  protected unregisterEvents() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
