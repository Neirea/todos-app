import React from 'react';
import * as Styled from './toggler.styled';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  active: boolean;
  onToggle: React.MouseEventHandler<HTMLButtonElement>;
};

export const Toggler = ({ active, onToggle, ...attributes }: Props) => (
  <Styled.TogglerButton type="button" active={active} onClick={onToggle} {...attributes}>
    <Styled.TogglerIndicator active={active} />
  </Styled.TogglerButton>
);
