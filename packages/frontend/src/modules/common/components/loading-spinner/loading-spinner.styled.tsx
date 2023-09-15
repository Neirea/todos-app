import styled from 'styled-components';
import { COLORS, DIMENSIONS, DIMENSION_PERCENTS, SPACES } from '../../../theme';

type Props = {
  height?: string;
};

export const LoadingContainer = styled('div')<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${DIMENSION_PERCENTS.p100};
  height: ${(props) => props.height || '100vh'};
`;

export const Loading = styled('div')`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: ${DIMENSIONS.d12};
    height: ${DIMENSIONS.d12};
    text-indent: 0;
    border-radius: ${DIMENSION_PERCENTS.p50};
    border: ${SPACES.s1} solid ${COLORS.white};

    margin: 0 auto;
    border-top: ${SPACES.s1} solid ${COLORS.success};
    animation: spinner 1s linear infinite;
  }
`;
