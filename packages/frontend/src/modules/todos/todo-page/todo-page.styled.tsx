import styled from 'styled-components';
import Button from '@mui/material/Button';
import { BREAKPOINT_QUERIES, DIMENSIONS, DIMENSION_PERCENTS, SPACES } from '../../theme';

export const Main = styled('main')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${SPACES.s8};

  @media ${BREAKPOINT_QUERIES.mobile} {
    margin-top: ${SPACES.s20};
  }
`;

export const TodoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${SPACES.s16};
  width: ${DIMENSION_PERCENTS.p80};
  margin: 0 auto;
`;

export const FlexContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${SPACES.s8};
`;

export const TogglerContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${DIMENSION_PERCENTS.p90};
  margin: 0 auto;
`;

export const BottomButton = styled(Button)`
  width: ${DIMENSIONS.d40};

  @media ${BREAKPOINT_QUERIES.mobile} {
    width: ${DIMENSIONS.d16};
  }
`;
