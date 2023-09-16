import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { RequestCriteria } from '@cartesianui/core';
import { BaseComponent } from './base.component';
import { ChildComponent} from './base.types';
import { IPaginationModel } from '../models';
import { ElementRef, ViewChild } from '@angular/core';


@Component({
  template: ''
})
export abstract class ListingControlsComponent<TDataModel, TSearchFormModel, TChildComponent extends ChildComponent = {}> extends BaseComponent<TChildComponent> {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  // use if data is passed from parent
  @Input()
  rows: Array<TDataModel>;

  @Input()
  selected: Array<TDataModel> = [];

  // cbClick & selectedChange both save, selected added laterly to use selected & selectedChange conventiobn
  // cbClick not removed to retain backwork compability
  @Output()
  selectedChange: EventEmitter<Array<TDataModel>> = new EventEmitter<Array<TDataModel>>();

  @Output()
  cbClick: EventEmitter<Array<TDataModel>> = new EventEmitter<Array<TDataModel>>();

  // Use to populate data directly (in add subscription)
  data: Array<TDataModel>;

  criteria: RequestCriteria<TSearchFormModel>;

  pagination: IPaginationModel;

  searchText = '';

  isTableLoading = false;

  constructor(injector: Injector) {
    super(injector);
    this.pagination = {
      currentPage: 1,
      perPage: 30
    };
  }

  protected abstract list(): void;

  protected abstract delete(): void;

  protected abstract addSubscriptions(): void;

  initCriteria(searchForm: { new (): TSearchFormModel }): RequestCriteria<TSearchFormModel> {
    return (this.criteria = new RequestCriteria<TSearchFormModel>(new searchForm()));
  }

  setPage(event): void {
    this.criteria.page(this.covertOffsetToPageNumber(event.offset));
    this.reload();
  }

  setSorting(event): void {
    this.criteria.orderBy(event.column.name, event.newValue);
    this.reload();
  }

  onSelect(event): void {
    this.selected = [...event.selected];
    this.cbClick.emit(event);
    this.selectedChange.emit(event);
  }

  startLoading(): void {
    // this.ui.setBusy(this.dtContainer.nativeElement);
    // this.isTableLoading = true;
  }

  completeLoading(): void {
    // this.ui.clearBusy();
    // this.isTableLoading = false;
  }

  getCurrentPage(): number {
    return this.pagination?.currentPage ?? 1;
  }

  getOffsetFromPagination(): number {
    return this.covertPageNumberToOffset(this.getCurrentPage());
  }

  covertPageNumberToOffset(pageNumber: number): number {
    return pageNumber - 1;
  }

  covertOffsetToPageNumber(offset: number): number {
    return offset + 1;
  }

  reload(): void {
    this.list();
  }
}
