export type Pagination = { page?: number; size?: number };

/**
 * When the `full` flag is provided the pagination will be disabled and the
 * entire list of items will be included in the result.
 */
export type SkippablePagination = Pagination & {
  /**
   * Skip the pagination and return the full result when provided.
   */
  full?: boolean;
};

export type Paginated<T> = {
  page: number;
  size: number;
  list: T;
};
