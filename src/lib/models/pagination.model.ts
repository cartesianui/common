interface IPaginationLinks {
  next?: string;
  previous?: string;
}

export interface IPaginationModel {
  count?: number; // current page count
  currentPage?: number; // current page
  links?: IPaginationLinks; // next previous
  perPage?: number; // limit per page
  total?: number; // total records
  totalPages?: number; // total pages
}
