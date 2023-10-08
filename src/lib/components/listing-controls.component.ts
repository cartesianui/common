import { AfterViewInit, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestCriteria } from '@cartesianui/core';
import { BaseComponent } from './base.component';
import { ChildComponent } from './base.types';
import { IPaginationModel } from '../models';

@Component({
  template: ''
})
export abstract class ListingControlsComponent<TDataModel, TSearchFormModel, TChildComponent extends ChildComponent = {}> extends BaseComponent<TChildComponent> implements AfterViewInit {
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

  criteria$: Subject<RequestCriteria<TSearchFormModel>>;

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

  ngAfterViewInit(): void {
    this.list();
  }

  initCriteria(searchForm: { new (): TSearchFormModel }): RequestCriteria<TSearchFormModel> {
    return (this.criteria = new RequestCriteria<TSearchFormModel>(new searchForm()));
  }

  setPage(event): void {
    this.criteria.page(this.covertOffsetToPageNumber(event.offset));
    this.list();
  }

  setSorting(event): void {
    this.criteria.orderBy(event.column.name, event.newValue);
    this.list();
  }

  onSelect(event): void {
    this.selected = [...event.selected];
    this.cbClick.emit(this.selected);
    this.selectedChange.emit(this.selected);
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

  hydrateSearchCriteria(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params) => {
        if (params['search']) this.criteria.urlParamsToSearchCriteria(params['search'] ?? '');
      })
    );
  }

  appendSearchCriteriaToUrl() {
    this._location.replaceState(`${this.router.url.split('?')[0]}${this.criteria.searchCriteriaToUrlParams()}`);
  }

  protected abstract list(): void;
}
