import React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import * as Styled from './todos-list.styled';
import { TODOS_PER_PAGE } from './todos.const';
import { useTodosButtonPagination } from '../../hooks/button-pagination.hook';
import { TodoActionBar } from './action-bar.component';

export const DesktopTodos = () => {
  const { todos, currentPage, totalPages, handlePageChange } = useTodosButtonPagination();
  const fillGapLength = TODOS_PER_PAGE - (todos?.length || 0);

  return (
    <>
      <TableContainer component={Paper}>
        <Styled.TodoTable aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos?.map((todo) => (
              <TableRow key={todo.id}>
                <Styled.TitleCell align="left" scope="row" size="small">
                  <Styled.SingleLineText>{todo.title}</Styled.SingleLineText>
                </Styled.TitleCell>
                <Styled.DescriptionCell align="left" size="small">
                  <Styled.SingleLineText>{todo.description}</Styled.SingleLineText>
                </Styled.DescriptionCell>
                <Styled.TodoCell align="left" size="small">
                  <TodoActionBar todo={todo} />
                </Styled.TodoCell>
              </TableRow>
            ))}
            {fillGapLength > 0 &&
              Array(fillGapLength)
                .fill(null)
                .map((_, index) => (
                  <TableRow key={`empty-row-${index}`}>
                    <Styled.TodoCell colSpan={3} size="small" />
                  </TableRow>
                ))}
          </TableBody>
        </Styled.TodoTable>
      </TableContainer>
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
