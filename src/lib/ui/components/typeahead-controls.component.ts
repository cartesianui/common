import { Injector } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { BaseComponent } from './base.component';

export class TypeaheadControlsComponent<ItemType> extends BaseComponent {
  /** Data suggested by typeahead */
  typeaheadData: string[] = [];
  /** The FormControl object */
  control: FormControl;
  /** List of all items. */
  items: ItemType[] = [];
  /** List of added items. */
  addedItems: ItemType[] = [];
  /** Property used for validation of `control.value`. */
  validationPropertyName = 'name';

  constructor(protected injector: Injector) {
    super(injector);
  }

  /**
   *
   * @param item Item to add to list of added items
   */
  addItem(item: ItemType) {
    if (this.control.valid) {
      this.addedItems = this.addedItems.concat(item);
      this.control.reset();
      this.resetValidators();
    }
  }

  /**
   *
   * @param item Item to remove from list of added items
   */
  removeItem(index: number) {
    this.addedItems.splice(index, 1);
  }

  /**
   * Resets validators on the `control` property
   * @param validators Array of custom validators
   */
  resetValidators(validators?: ValidatorFn[]) {
    const v = validators
      ? validators
      : [
          Validators.required,
          this.formValidator.inValidator(this.typeaheadData),
          this.formValidator.notInValidator(
            this.addedItems.map((item) => item[this.validationPropertyName])
          ),
        ];
    this.control.setValidators(v);
    this.control.updateValueAndValidity();
  }
}
