import styled from 'styled-components';
import { COLORS, DIMENSIONS, DIMENSION_PERCENTS, SPACES } from '../../../theme';

type ToggledProps = {
  active: boolean;
};

export const TogglerButton = styled('button')<ToggledProps>`
  position: relative;
  width: ${DIMENSIONS.d16};
  height: ${SPACES.s8};
  border-radius: ${SPACES.s4};
  background-color: ${(props) => (props.active === true ? COLORS.success : COLORS.black)};
  cursor: pointer;

  &:disabled {
    opacity: ${DIMENSION_PERCENTS.p50};
  }
`;

export const TogglerIndicator = styled('div')<ToggledProps>`
  --transition: 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: absolute;
  top: 0;
  left: ${(props) => (props.active === true ? DIMENSION_PERCENTS.p50 : '0')};
  width: ${DIMENSION_PERCENTS.p50};
  height: ${DIMENSION_PERCENTS.p100};
  background: linear-gradient(to bottom, ${COLORS.white}, ${COLORS.primary});
  border-radius: ${DIMENSION_PERCENTS.p50};
  border: 1px solid ${COLORS.black};
  transform: scale(0.8);
  transition: left var(--transition), color var(--transition);
  box-shadow: inset 0 0 ${SPACES.s1} ${COLORS.secondary};
`;
