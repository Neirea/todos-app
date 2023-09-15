import styled from 'styled-components';
import MuiButton from '@mui/material/Button';
import { SPACES, DIMENSIONS } from '../theme';

export const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${SPACES.s20};
  margin-bottom: ${SPACES.s4};
  gap: ${DIMENSIONS.d12};
`;

export const Button = styled(MuiButton)`
  min-width: ${DIMENSIONS.d40};
  margin: 0 auto;
`;
