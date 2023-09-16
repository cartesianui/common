import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

type allowedDateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD' | 'YYYY-MM-DD H:i:s';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {
  static shortFormat: allowedDateFormat = 'YYYY-MM-DD';
  static longFormat: allowedDateFormat = 'YYYY-MM-DD';
  static dbFormat: allowedDateFormat = 'YYYY-MM-DD H:i:s';

  static sql(date, format?: allowedDateFormat): DateTime | any {
    return format ? DateTime.fromSQL(date).toFormat(format) : DateTime.fromSQL(date);
  }

  static iso(date, format?: allowedDateFormat): DateTime | any {
    return format ? DateTime.fromISO(date).toFormat(format) : DateTime.fromISO(date);
  }

  static millis(date, format?: allowedDateFormat): DateTime | any {
    return format ? DateTime.fromMillis(date).toFormat(format) : DateTime.fromMillis(date);
  }

  static now(format?): DateTime | any {
    return format ? DateTime.now().toFormat(format) : DateTime.now();
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
}
