import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LoadingSpinner } from '../../common/components/loading-spinner';
import useCurrentUser from '../../common/hooks/current-user.hook';
import Header from '../../header';
import { BREAKPOINT_QUERIES } from '../../theme';
import { CreateTodo } from '../create-update-todo';
import { useTodosQueryParams } from '../hooks/query-params.hook';
import { MobileTodos, TabletTodos, DesktopTodos } from './todos-list';
import * as Styled from './todos-page.styled';

const Todos = () => {
  const { user, isLoading } = useCurrentUser();
  const { queryParams, handleQueryChange } = useTodosQueryParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const isMobile = useMediaQuery(BREAKPOINT_QUERIES.mobile);
  const isTablet = useMediaQuery(BREAKPOINT_QUERIES.tablet);

  const isPublic = !user;

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      handleQueryChange('search', target.value);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <Styled.Main>
        <Styled.TopPanel>
          {!isPublic && (
            <>
              <Styled.CreateButton variant="outlined" onClick={() => setShowCreateModal(true)}>
                Create Todo
              </Styled.CreateButton>
              <CreateTodo isOpen={showCreateModal} closeModal={() => setShowCreateModal(false)} />
            </>
          )}
          <Styled.FilterContainer>
            <ToggleButtonGroup
              size="small"
              value={queryParams.status}
              exclusive
              onChange={(e, value) => handleQueryChange('status', value)}
            >
              <ToggleButton value="">All</ToggleButton>
              {!isPublic && <ToggleButton value="private">Private</ToggleButton>}
              {!isPublic && <ToggleButton value="public">Public</ToggleButton>}
              <ToggleButton value="completed">Completed</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              label="Search field"
              type="search"
              variant="standard"
              onKeyDown={handleSearchEnter}
            />
          </Styled.FilterContainer>
        </Styled.TopPanel>
        <Styled.TodosContainer>
          {isMobile ? <MobileTodos /> : isTablet ? <TabletTodos /> : <DesktopTodos />}
        </Styled.TodosContainer>
      </Styled.Main>
    </>
  );
};

export default Todos;
