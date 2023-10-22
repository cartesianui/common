import { EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";

class WatchedEventEmitter extends EventEmitter<any> {
  private _subscriberCount = 0;
  get subscriberCount(): number {
    return this._subscriberCount;
  }

  override subscribe(next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    ++this._subscriberCount;
    return super.subscribe(next, error, complete);
  }

  override unsubscribe() {
    --this._subscriberCount;
    super.unsubscribe();
  }
}

export {
  WatchedEventEmitter
}
