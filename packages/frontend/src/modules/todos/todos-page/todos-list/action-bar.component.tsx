import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Toggler } from '../../../common/components/toggler';
import { APP_KEYS } from '../../../common/consts';
import useCurrentUser from '../../../common/hooks/current-user.hook';
import { TTodo } from '../../../common/types/todo.type';
import { UpdateTodo } from '../../create-update-todo';
import { useDeleteTodo } from '../../hooks/delete-todo.hook';
import { useUpdateTodo } from '../../hooks/update-todo.hook';
import * as Styled from './todos-list.styled';

export const TodoActionBar = ({ todo }: { todo: TTodo }) => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { mutateAsync: deleteTodo, isLoading: deleteLoading } = useDeleteTodo();
  const { mutateAsync: updateTodo, isLoading: updateLoading } = useUpdateTodo();

  const disabledEdit = deleteLoading || updateLoading || !user;

  const handleUpdate = () => {
    const { created_at: createdAt, updated_at: updatedAt, ...data } = todo;
    data.is_completed = !data.is_completed;
    updateTodo(data);
  };
  const handleDelete = () => deleteTodo(todo.id);
  const handleView = () => navigate(APP_KEYS.ROUTER_KEYS.TODO(todo.id));

  return (
    <Styled.ActionButtonsContainer>
      <UpdateTodo
        todo={todo}
        isOpen={showUpdateModal}
        closeModal={() => setShowUpdateModal(false)}
      />
      <Styled.CrudButtonsContainer>
        <Button variant="outlined" size="small" onClick={handleView}>
          View
        </Button>
        {user && (
          <>
            <Button
              variant="outlined"
              size="small"
              disabled={disabledEdit}
              onClick={() => setShowUpdateModal(true)}
            >
              Edit
            </Button>
            <Button variant="outlined" size="small" disabled={disabledEdit} onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </Styled.CrudButtonsContainer>
      <Toggler active={todo.is_completed} onToggle={handleUpdate} disabled={disabledEdit} />
    </Styled.ActionButtonsContainer>
  );
};
