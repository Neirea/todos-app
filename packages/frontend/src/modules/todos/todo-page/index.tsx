import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as Styled from './todo-page.styled';
import Header from '../../header';
import { APP_KEYS } from '../../common/consts';
import todoService from '../../../service/todo.service';
import { Toggler } from '../../common/components/toggler';
import { UpdateTodo } from '../create-update-todo';
import { LoadingSpinner } from '../../common/components/loading-spinner';
import { NotFound } from '../../not-found';
import { useInvalidateMutation } from '../../common/hooks/invalidate-mutation.hook';
import { TTodoBoolean } from '../../common/types/todo.type';
import useCurrentUser from '../../common/hooks/current-user.hook';
import { isAuthError } from '../../auth/error-boundary/is-auth-error.util';

const Todo = () => {
  const { id: idParam } = useParams();
  const id = idParam || '';
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { data: todo, isLoading } = useQuery([APP_KEYS.QUERY_KEYS.TODOS, id], () =>
    todoService.getOneById(id)
  );
  const { mutateAsync: updateTodo } = useInvalidateMutation(
    [APP_KEYS.QUERY_KEYS.TODOS],
    todoService.updateOne.bind(todoService),
    { useErrorBoundary: (error) => isAuthError(error) }
  );

  const disableEdit = user ? user?.id !== todo?.user_id : true;

  const handleToggle = (field: TTodoBoolean) => {
    if (!todo) return;
    const { created_at: createdAt, updated_at: updatedAt, ...newTodo } = todo;
    newTodo[field] = !newTodo[field];
    updateTodo(newTodo);
  };

  if (!todo && !isLoading) return <NotFound />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <Styled.Main>
        <Styled.TodoContainer>
          <Typography variant="h3">{todo.title}</Typography>
          <Styled.FlexContainer>
            <Typography variant="h5">Description:</Typography>
            <Typography>{todo.description}</Typography>
          </Styled.FlexContainer>
          <Styled.FlexContainer>
            <Styled.TogglerContainer>
              <Typography variant="h6">Complete</Typography>
              <Toggler
                active={todo.is_completed}
                disabled={disableEdit}
                onToggle={() => handleToggle('is_completed')}
              />
            </Styled.TogglerContainer>
            <Styled.TogglerContainer>
              <Typography variant="h6">Private</Typography>
              <Toggler
                active={todo.is_private}
                disabled={disableEdit}
                onToggle={() => handleToggle('is_private')}
              />
            </Styled.TogglerContainer>
            <Styled.TogglerContainer>
              <UpdateTodo
                todo={todo}
                isOpen={showUpdateModal}
                closeModal={() => setShowUpdateModal(false)}
              />
              <Styled.BottomButton variant="outlined" onClick={() => navigate(-1)}>
                Back
              </Styled.BottomButton>
              {!disableEdit && (
                <Styled.BottomButton variant="outlined" onClick={() => setShowUpdateModal(true)}>
                  Edit
                </Styled.BottomButton>
              )}
            </Styled.TogglerContainer>
          </Styled.FlexContainer>
        </Styled.TodoContainer>
      </Styled.Main>
    </>
  );
};

export default Todo;
