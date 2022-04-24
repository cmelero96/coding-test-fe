import styled from 'styled-components';
import {COLORS} from '../constants/UI';

export const DataTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  
  th:nth-child(3), td:nth-child(3) { text-align: right; }
  th:nth-child(5), td:nth-child(5) { text-align: left; }

  > thead {
    color: ${COLORS.base[40]};
    background-color: ${COLORS.base[85]};
    text-transform: uppercase;
    font-size: 12px;
    height: 32px;
  }

  > tbody {
    background-color: ${COLORS.base[90]};
    color: ${COLORS.base[40]};
    font-size: 14px;
    line-height: 20px;
  
    > tr {
      color: ${COLORS.base[40]};
      height: 60px;
      line-height: 20px;
    }
  }
`;

export const TeamCell = styled.td`
  display: flex;
  height: inherit;
  flex-direction: ${props => props.first ? 'row' : 'row-reverse' };
  justify-content: flex-end;
  align-items: center;

  img {
    padding: 0 1em;
    width: 24px;
  }
`

export const ScoreCell = styled.td`
  text-align: center;
  width: 110px;
`
