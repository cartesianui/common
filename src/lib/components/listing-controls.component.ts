import { Directive, EventEmitter, Injector, Input, Output } from '@angular/core';
import { RequestCriteria } from '@cartesianui/core';
import { BaseComponent } from './base.component';
import { IPaginationModel } from '../models';
import {ElementRef, ViewChild} from "@node_modules/@angular/core";

@Directive()
export abstract class ListingControlsComponent<TDataModel, TSearchFormModel> extends BaseComponent {

  @ViewChild('dtContainer') dtContainer: ElementRef;

  // use if data is passed from parent
  @Input()
  rows: Array<TDataModel>;

  @Output()
  cbClick: EventEmitter<Array<TDataModel>> = new EventEmitter<Array<TDataModel>>();

  data: Array<TDataModel>; // use to populate data directly in child

  selected: Array<TDataModel> = [];

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
