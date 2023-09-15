import React from 'react';
import Typography from '@mui/material/Typography';
import * as Styled from './not-found.styled';

export const NotFound = () => (
  <Styled.Main>
    <Typography variant="h1" color="red">
      Error 404
    </Typography>
    <Typography variant="h3">Could not find page with this url</Typography>
  </Styled.Main>
);
