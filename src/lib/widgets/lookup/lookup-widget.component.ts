import {ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnChanges, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {BaseComponent} from '../../components/base.component';

@Component({
  selector: 'lookup-widget, .lookup-widget',
  templateUrl: './lookup-widget.component.html',
  styleUrls:['./lookup-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LookupWidgetComponent<T> extends BaseComponent implements OnChanges {
  @Input() options: Array<T> = [];
  @Input() ignoreOptions: Array<T> = [];
  @Input() multiValue: boolean = true;
  @Input() multiValueSeparator: string = ',';
  @Input() optionField: string = 'name';
  @Input() selected:Array<T> = [];
  @Output() selectedChange: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();
  value: string;
  formControl: FormControl;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnChanges() {
    this.filter();
    let validOptions = this.options.map((option) => (option[this.optionField] ?? option));
    this.formControl = new FormControl('', [Validators.required, this.formValidator.inValidator(validOptions)]);
  }

  onSelect() {
    if (this.formControl.valid) {
      let values = this.value.split(this.multiValueSeparator)
      let current = this.options.filter(o => values.indexOf(o[this.optionField]) !== -1)
      this.selected.push(...current);
      this.value = '';
    }
  }

  onDelete(i: number) {
    this.selected.splice(i, 1);
  }

  filter () {
    if(this.ignoreOptions?.length) {
      this.options = this.options.filter((o) => {
        // some returns true, if o exists in ignore list
        return  ! this.ignoreOptions.some((i) => {
          return o[this.optionField] === i[this.optionField];
        });
      });
    }
  }
}
