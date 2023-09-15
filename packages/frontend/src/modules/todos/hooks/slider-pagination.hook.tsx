import { useInfiniteQuery } from 'react-query';
import Swiper from 'swiper';
import todoService from '../../../service/todo.service';
import { TTodo } from '../../common/types/todo.type';
import { TODOS_PER_PAGE } from '../todos-page/todos-list/todos.const';
import { APP_KEYS } from '../../common/consts';
import { useTodosQueryParams } from './query-params.hook';

export const useTodosSliderPagination = () => {
  const { queryParams } = useTodosQueryParams();
  const { page, ...sliderQueryParams } = queryParams;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [APP_KEYS.QUERY_KEYS.TODOS, sliderQueryParams],
    ({ pageParam = 0 }) =>
      todoService.getAll({
        page: pageParam + 1,
        ...sliderQueryParams
      }),
    {
      getNextPageParam(lastPage, allPages) {
        const totalPages = Math.ceil(lastPage.total / TODOS_PER_PAGE);
        if (allPages.length === totalPages) return;
        return allPages.length;
      }
    }
  );

  const todos = data?.pages.reduce((arr, curr) => arr.concat(curr.todos), [] as TTodo[]);

  const handleSwipe = async (swiper: Swiper) => {
    if (swiper.activeIndex >= swiper.slides.length - 2 && hasNextPage) {
      fetchNextPage();
    }
  };

  return { todos, handleSwipe };
};
