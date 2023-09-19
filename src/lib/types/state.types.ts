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

export type ResponseMeta = { pagination: Object } & { [key: string]: any };

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
