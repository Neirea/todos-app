import styled from 'styled-components';
import { SPACES, DIMENSIONS, DIMENSION_PERCENTS } from '../theme';

export const Header = styled('header')`
  position: relative;
  display: flex;
  justify-content: center;
  width: ${DIMENSION_PERCENTS.p100};
  height: ${DIMENSIONS.d12};
  padding-top: ${SPACES.s4};
`;

export const HeaderContainer = styled('div')`
  position: sticky;
  display: flex;
  margin: 0 auto;
  width: ${DIMENSION_PERCENTS.p80};
  justify-content: space-between;
`;

export const AuthContainer = styled('div')`
  display: flex;
  gap: ${SPACES.s1};
`;
