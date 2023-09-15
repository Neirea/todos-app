import styled from 'styled-components';
import Button from '@mui/material/Button';
import { SPACES, DIMENSION_PERCENTS, BREAKPOINT_QUERIES } from '../../theme';

export { Main } from '../../common/components/main';

export const TodosContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${DIMENSION_PERCENTS.p80};
  margin: 0 auto;
`;

export const TopPanel = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${SPACES.s4} 0;
  width: ${DIMENSION_PERCENTS.p80};
  gap: ${SPACES.s2};
`;

export const FilterContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${DIMENSION_PERCENTS.p100};

  @media ${BREAKPOINT_QUERIES.mobile} {
    flex-wrap: wrap;
    flex-direction: column-reverse;
    gap: ${SPACES.s4};
  }
`;

export const CreateButton = styled(Button)`
  align-self: flex-start;
`;
