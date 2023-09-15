import React from 'react';
import Pagination from '@mui/material/Pagination';
import * as Styled from './todos-list.styled';
import { useTodosButtonPagination } from '../../hooks/button-pagination.hook';
import { TodoActionBar } from './action-bar.component';

export const MobileTodos = () => {
  const { todos, currentPage, totalPages, handlePageChange } = useTodosButtonPagination();

  return (
    <>
      <Styled.MobileTodosContainer>
        {todos?.map((todo) => (
          <Styled.MobileTodoContainer key={todo.id}>
            <Styled.SingleLineText variant="h4">{todo.title}</Styled.SingleLineText>
            <Styled.MultilineText>{todo.description}</Styled.MultilineText>
            <TodoActionBar todo={todo} />
          </Styled.MobileTodoContainer>
        ))}
      </Styled.MobileTodosContainer>
      <Styled.BottomPanel>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={(e, value) => handlePageChange(value)}
        />
      </Styled.BottomPanel>
    </>
  );
};
