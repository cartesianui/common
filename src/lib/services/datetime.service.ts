import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

type allowedDateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD' | 'y-m-d H:i:s';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {
  static shortFormat: allowedDateFormat = 'YYYY-MM-DD';
  static longFormat: allowedDateFormat = 'YYYY-MM-DD';
  static dbFormat: allowedDateFormat = 'y-m-d H:i:s';

  static fromSql(date, format?: allowedDateFormat): DateTime | any {
    return format ? DateTime.fromSQL(date).toFormat(format) : DateTime.fromSQL(date);
  }

  static fromISO(date, format?: allowedDateFormat): DateTime | any {
    return format ? DateTime.fromISO(date).toFormat(format) : DateTime.fromISO(date);
  }

  static fromMillis(date, format?: allowedDateFormat): DateTime | any {
    return format ? DateTime.fromMillis(date).toFormat(format) : DateTime.fromMillis(date);
  }

  static fromJSDate(date: Date) {
    return DateTime.fromJSDate(date);
  }

  static now(format?): DateTime | any {
    return format ? DateTime.now().toFormat(format) : DateTime.now();
  }

  static toISO(date: string) {
    return DatetimeService.fromISO(date).toISO();
  }

  static toJSDate(date: string) {
    return DatetimeService.fromISO(date).toJSDate();
  }

  static toLocal(date: string) {
    return DatetimeService.fromISO(date).toLocaleString();
  }

  static timeSince(start: string, precision: 'years' | 'months' | 'days' = 'years'): string {
    let today = DateTime.now();
    let startDate = DateTime.fromISO(start);

    let duration: any = today.diff(startDate);
    let days, months, years: string;

    let html: string = '';
    switch (precision) {
      case 'days':
        // Note: Going one unit lower give us integer/rounded values
        duration = duration.shiftTo('years', 'months', 'days', 'hours');
        days = duration.days.toString();
        months = duration.months.toString();
        years = duration.years.toString();

        html += [years, 'years', months, 'months', days, 'days'].join(' ');
        break;
      case 'months':
        duration = duration.shiftTo('years', 'months', 'days');

        months = duration.months.toString();
        years = duration.years.toString();

        html += [years, 'years', months, 'months'].join(' ');
        break;
      default:
        // years
        duration = duration.shiftTo('years', 'months');

        years = duration.years.toString();

        // Do not display unit when only years
        html += years;
        break;
    }

    return html;
  }

  static valid(date: string): boolean {
    return DatetimeService.fromISO(date).isValid;
  }

  static isGreater(date: string, minDate: string, boundry: boolean = false): boolean {
    return boundry ? DatetimeService.fromISO(date) > DatetimeService.fromISO(minDate) : DatetimeService.fromISO(date) >= DatetimeService.fromISO(minDate);
  }

  static isLess(date: string, maxDate: string, boundry: boolean = false): boolean {
    return boundry ? DatetimeService.fromISO(date) < DatetimeService.fromISO(maxDate) : DatetimeService.fromISO(date) <= DatetimeService.fromISO(maxDate);
  }

  static inDateRange(date: string, minDate: string, maxDate: string, boundry: boolean = false): boolean {
    return DatetimeService.isGreater(date, minDate, boundry) && DatetimeService.isLess(date, maxDate, boundry);
  }
}
