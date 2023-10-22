import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { WatchedEventEmitter } from './WatchedEventSubscriber';

@Component({
  selector: 'default-actions, page-actions',
  styleUrls: ['./default-actions.component.scss'],
  templateUrl: './default-actions.component.html'
})
export class DefaultActionsComponent {
  _disabled: { [key: string]: boolean };
  @Input()
  set disabled(disabled: { [key: string]: boolean }) {
    this._disabled = disabled;
  }

  _hide: { [key: string]: boolean };
  @Input()
  set hide(hide: { [key: string]: boolean }) {
    this._hide = hide;
  }

  @Input()
  search: string = '';

  @Output() view: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() save: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() create: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() update: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() edit: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() delete: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() deleteAll: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() deleteSelected: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() activate: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() activateAll: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() activateSelected: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() deactivate: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() deactivateAll: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() deactivateSelected: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() enable: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() disable: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() attach: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() detach: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() assign: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() revoke: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() remove: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() import: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() export: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() exportAll: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() exportSelected: WatchedEventEmitter = new WatchedEventEmitter();
  @Output() searchChange: WatchedEventEmitter = new WatchedEventEmitter();

  onView(e) {
    this.view.emit({ event: e });
  }

  onDelete(e) {
    this.delete.emit({ event: e });
  }

  onExport(e) {
    this.export.emit({ event: e });
  }

  onImport(e) {
    this.import.emit({ event: e });
  }

  onDeactivate(e) {
    this.deactivate.emit({ event: e });
  }

  onActivate(e) {
    this.activate.emit({ event: e });
  }

  onDisable(e) {
    this.disable.emit({ event: e });
  }

  onEnable(e) {
    this.enable.emit({ event: e });
  }

  onAttach(e) {
    this.attach.emit({ event: e });
  }

  onDetach(e) {
    this.detach.emit({ event: e });
  }

  onAssign(e) {
    this.assign.emit({ event: e });
  }

  onRemove(e) {
    this.remove.emit({ event: e });
  }

  onRevoke(e) {
    this.revoke.emit({ event: e });
  }

  onUpdate(e) {
    this.update.emit({ event: e });
  }

  onEdit(e) {
    this.edit.emit({ event: e });
  }

  onSave(e) {
    this.save.emit({ event: e });
  }

  onCreate(e) {
    this.create.emit({ event: e });
  }

  onSearch() {
    this.searchChange.emit({ text: this.search });
  }
}
