import { Injectable } from '@angular/core';
import { DateTime } from "luxon";

type allowedDateFormat = "YYYY-MM-DD" | "YYYY-MM-DD" | "YYYY-MM-DD H:i:s";

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

}
