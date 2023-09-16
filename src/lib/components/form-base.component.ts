import { Component, Injector, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from './base.component';
import { ChildComponent } from './base.types';

@Component({
  template: ''
})
export abstract class FormBaseComponent<TDataModel, TChildComponent extends ChildComponent = {}> extends BaseComponent<TChildComponent> {

  @Output() created: EventEmitter<TDataModel> = new EventEmitter();

  @Output() updated: EventEmitter<TDataModel> = new EventEmitter();

  formGroup: FormGroup;

  constructor(injector: Injector) {
    super(injector);
  }

}
