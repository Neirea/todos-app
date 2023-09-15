import { useEffect } from 'react';
import { useQuery } from 'react-query';
import todoService from '../../../service/todo.service';
import { APP_KEYS } from '../../common/consts';
import { TODOS_PER_PAGE } from '../todos-page/todos-list/todos.const';
import { toNumber } from '../../common/utils/string-to-number.util';
import { useTodosQueryParams } from './query-params.hook';

export const useTodosButtonPagination = () => {
  const { queryParams, handleQueryChange } = useTodosQueryParams();
  const { data } = useQuery([APP_KEYS.QUERY_KEYS.TODOS, queryParams], () =>
    todoService.getAll({ ...queryParams })
  );
  const totalPages = data ? Math.ceil(data.total / TODOS_PER_PAGE) : 0;

  const currentPage = toNumber(queryParams.page, 1);

  const handlePageChange = (value: number) => {
    handleQueryChange('page', value.toString());
  };

  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      handlePageChange(totalPages);
    }
    if (currentPage <= 0) {
      handlePageChange(1);
    }
  }, [data]);

  return { todos: data?.todos, totalPages, currentPage, handlePageChange };
};
