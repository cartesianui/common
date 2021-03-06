import { Injector } from '@angular/core';
import { SessionService, localeDateString } from '@cartesianui/core';

export abstract class Sandbox {
  protected _sessionService: SessionService;
  public culture: string;

  constructor(protected injector: Injector) {
    this._sessionService = injector.get(SessionService);
  }

  /**
   * Formats date string based on selected culture
   *
   * @param string value date string to be formatted
   */
  public formatDate(value: string) {
    return localeDateString(value, this.culture);
  }
}
