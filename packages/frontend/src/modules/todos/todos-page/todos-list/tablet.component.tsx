import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'swiper/css';
import { SwiperRef, SwiperSlide } from 'swiper/react';
import { useTodosSliderPagination } from '../../hooks/slider-pagination.hook';
import { TodoActionBar } from './action-bar.component';
import * as Styled from './todos-list.styled';

export const TabletTodos = () => {
  const [searchParams] = useSearchParams();
  const { todos, handleSwipe } = useTodosSliderPagination();
  const swiperRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(0, 0);
  }, [searchParams]);

  return (
    <Styled.TabletSwiper
      ref={swiperRef}
      spaceBetween={16}
      slidesPerView="auto"
      onSlideChangeTransitionEnd={handleSwipe}
    >
      {todos?.map((todo) => (
        <SwiperSlide key={todo.id}>
          <Styled.TabletTodoContainer>
            <Styled.SingleLineText variant="h4">{todo.title}</Styled.SingleLineText>
            <Styled.TabletDescContainer>
              <Styled.MultilineText>{todo.description}</Styled.MultilineText>
            </Styled.TabletDescContainer>
            <TodoActionBar todo={todo} />
          </Styled.TabletTodoContainer>
        </SwiperSlide>
      ))}
    </Styled.TabletSwiper>
  );
};
