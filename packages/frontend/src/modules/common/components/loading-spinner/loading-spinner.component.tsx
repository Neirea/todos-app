import React from 'react';
import * as Styled from './loading-spinner.styled';

export const LoadingSpinner = (props: Partial<React.CSSProperties>) => {
  const { height } = props;
  const containerHeight = height?.toString();

  return (
    <Styled.LoadingContainer height={containerHeight}>
      <Styled.Loading>
        <div />
      </Styled.Loading>
    </Styled.LoadingContainer>
  );
};
