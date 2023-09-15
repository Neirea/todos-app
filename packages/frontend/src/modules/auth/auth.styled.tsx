import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DIMENSIONS, SPACES } from '../theme';

export { Main } from '../common/components/main';

export const TodoForm = styled('form')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(${DIMENSIONS.d100}, 80vw);
  padding: ${SPACES.s4};
  gap: ${SPACES.s4};
`;

export const NavigateButton = styled(Button)`
  position: absolute !important;
  left: 0;
`;

export const LineText = styled(Typography)`
  &:empty::after {
    content: ' ';
    white-space: pre;
  }
`;

export const DialogContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACES.s4};
  padding: ${SPACES.s8};
`;
