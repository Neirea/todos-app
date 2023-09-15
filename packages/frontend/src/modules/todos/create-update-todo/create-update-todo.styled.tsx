import styled from 'styled-components';
import { DIMENSIONS, DIMENSION_PERCENTS, SPACES } from '../../theme';

export const TodoForm = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(${DIMENSIONS.d100}, 80vw);
  padding: ${SPACES.s4};
  gap: ${SPACES.s4};
`;

export const TogglerContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${DIMENSION_PERCENTS.p80};
`;
