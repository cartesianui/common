import { EntityState as NgRxEntityState } from "@ngrx/entity";

export type LoaderState = {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
};

export type RequestState = {
  sent: boolean;
  completed: boolean;
  failed: boolean;
};

export type Pagination = {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: Object

}
export type ResponseMeta = { pagination: Pagination } & { [key: string]: any };

export type BaseState<T> = T & LoaderState;

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
  loading: boolean;
  loaded: boolean;
  failed: boolean;
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