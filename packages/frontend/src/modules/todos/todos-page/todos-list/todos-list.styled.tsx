import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Swiper } from 'swiper/react';
import styled from 'styled-components';
import { COLORS, SPACES, DIMENSIONS, DIMENSION_PERCENTS, BREAKPOINT_QUERIES } from '../../../theme';

const ContainerCSS = `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  width: ${DIMENSION_PERCENTS.p100};
  gap: ${SPACES.s4};
`;

export const MobileTodosContainer = styled('div')`
  ${ContainerCSS}
`;

export const MobileTodoContainer = styled('div')`
  ${ContainerCSS}
  margin: 0 auto;
`;

export const TabletTodoContainer = styled('div')`
  ${ContainerCSS}
  margin: ${SPACES.s4} auto;
`;

export const TabletSwiper = styled(Swiper)`
  position: relative;
  align-self: flex-start;
  left: 0;
  margin: 0;
  width: ${DIMENSION_PERCENTS.p50};
`;

export const TabletDescContainer = styled('div')`
  height: ${DIMENSIONS.d20};
`;

export const SingleLineText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MultilineText = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TodoCell = styled(TableCell)`
  height: ${DIMENSIONS.d12};
`;

export const TodoTable = styled(Table)`
  border: 1px solid ${COLORS.secondary};
`;

export const TitleCell = styled(TodoCell)`
  width: ${DIMENSION_PERCENTS.p20};
  max-width: ${DIMENSIONS.d40};
`;

export const DescriptionCell = styled(TodoCell)`
  width: ${DIMENSION_PERCENTS.p60};
  max-width: ${DIMENSIONS.d80};
`;

export const ActionButtonsContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${SPACES.s2};
  width: ${DIMENSION_PERCENTS.p100};
`;

export const CrudButtonsContainer = styled('div')`
  display: flex;
  gap: ${SPACES.s2};
  align-items: center;
`;

export const BottomPanel = styled('div')`
  display: flex;
  justify-content: flex-start;
  padding-top: ${SPACES.s4};
  width: ${DIMENSION_PERCENTS.p100};

  @media ${BREAKPOINT_QUERIES.mobile} {
    justify-content: center;
  }
`;
