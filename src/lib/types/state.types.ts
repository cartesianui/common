import { EntityState as NgRxEntityState } from '@ngrx/entity';

export type Pagination = {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: Object;
};

export type RequestState = { started: boolean; compeleted: boolean; failed: boolean };

export type ResponseMeta = { pagination: Pagination } & { [key: string]: any };

export type BaseState<T> = T;

export type Entity<E> = {
  data: E | null;
};

export type EntityList<E> = {
  data: {
    data: Array<E> | null;
    meta: object;
  };
};

export type EntityState<E> = BaseState<Entity<E>>;

export type EntityListState<E> = BaseState<EntityList<E>>;

export interface EntityStateExtended<T> extends NgRxEntityState<T> {
  meta: ResponseMeta | null;
  request: RequestState | undefined;  // General Request
  creation: RequestState | undefined; // Create Request
  updation: RequestState | undefined; // Update Request
}

/**
 *
 * @param meta meta property from current state
 * @param action add | delete
 *
 * Updates pagination on add or delete actions
 * @returns
 */

export const updateMetaState = (meta: ResponseMeta, action: string): ResponseMeta => {
  switch (action) {
    case 'add':
      return { ...meta, pagination: { ...meta.pagination, total: meta.pagination.total + 1, count: meta.pagination.count + 1 } };
    case 'delete':
      return { ...meta, pagination: { ...meta.pagination, total: meta.pagination.total - 1, count: meta.pagination.count - 1 } };
  }
};
export const requestDefault: RequestState = { started: false, compeleted: false, failed: false };
export const requestStarted: RequestState = { started: true, compeleted: false, failed: false };
export const requestCompleted: RequestState = { started: false, compeleted: true, failed: false };
export const requestFailed: RequestState = { started: false, compeleted: false, failed: true };
