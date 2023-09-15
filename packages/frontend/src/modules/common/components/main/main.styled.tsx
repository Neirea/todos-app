import styled from 'styled-components';
import { DIMENSIONS } from '../../../theme';

export const Main = styled('main')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${DIMENSIONS.d12});
  text-align: center;
`;
