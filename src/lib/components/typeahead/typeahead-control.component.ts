import { Component, EventEmitter, Injector, Input, Output, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'typeahead-control',
  templateUrl: './typeahead-control.component.html'
})
export class TypeaheadControlComponent<T> extends BaseComponent implements OnChanges {
  @Input() options: Array<T> = [];
  @Input() optionField: string = 'name';
  @Input() multiple: boolean = false;
  @Output() updated: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();
  selected: Array<T> = [];
  formControl: FormControl;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnChanges() {
    // options is array of object, fetch object key, use to populate options
    let validValues = this.options.map((option) => (option[this.optionField] ? option[this.optionField] : option));
    this.formControl = new FormControl('', [Validators.required, this.formValidator.inValidator(validValues)]);
  }

  processSelected() {
    if (this.formControl.valid) {
      this.updated.emit(this.selected);
    }
  }

  // resetValidators(validators?: ValidatorFn[]) {
  //   validators = validators
  //     ? validators
  //     : [Validators.required, this.formValidator.inValidator(this.options), this.formValidator.notInValidator(this.selected.map((item) => item[this.optionField]))];
  //   this.formControl.setValidators(validators);
  //   this.formControl.updateValueAndValidity();
  // }
}
