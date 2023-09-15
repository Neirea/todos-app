import { useSearchParams } from 'react-router-dom';
import { deleteEmptyProperties } from '../../common/utils/delete-empty-properties.util';
import { TSearchParams } from '../../common/types/todo.type';

const getTodosQueryParams = (URLParams: URLSearchParams): TSearchParams => {
  const page = URLParams.get('page') || '';
  const status = URLParams.get('status') || '';
  const search = URLParams.get('search') || '';
  return { page, status, search };
};

export const useTodosQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = getTodosQueryParams(searchParams);

  const handleQueryChange = (key: keyof TSearchParams, value: string | null) => {
    const newQueryParams = deleteEmptyProperties({ ...queryParams, [key]: value });
    setSearchParams(newQueryParams);
  };

  return { queryParams, handleQueryChange };
};
