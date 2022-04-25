import styled from 'styled-components';
import {COLORS} from '../constants/UI';

export const DataTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  
  td:nth-child(1) { font-weight: 600 }
  td:nth-child(2) { color: ${COLORS.base[0]} }
  td:nth-child(3), th:nth-child(3) { text-align: right; }
  td:nth-child(5), th:nth-child(5) { text-align: left; }
  td:nth-child(6) { 
    max-width: 20em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > thead {
    color: ${COLORS.base[40]};
    background-color: ${COLORS.base[85]};
    text-transform: uppercase;
    font-size: 12px;
    height: 32px;

    th {
      padding: 0 0.5rem;
    }
  }

  > tbody {
    background-color: ${COLORS.base[90]};
    color: ${COLORS.base[40]};
    font-size: 14px;
    line-height: 20px;
  
    > tr {
      color: ${COLORS.base[40]};
      border-bottom: 1px solid ${COLORS.base[75]};
      height: 60px;
      line-height: 20px;

      > td {
        padding: 0 0.5em;
      }
    }
  }
`;

export const TeamCell = styled.td`
  display: flex;
  height: inherit;
  overflow: hidden;
  flex-direction: ${(props) => props.first ? 'row' : 'row-reverse' };
  justify-content: flex-end;
  align-items: center;

  > span {
    color: ${COLORS.base[0]};
    padding: 0 0.5em;
  }

  img {
    width: 24px;
  }
`

export const ScoreCell = styled.td`
  text-align: center;
  font-weight: 600;
  width: 120px;
  overflow: hidden;
  white-space: nowrap;

  > .highlight {
    color: ${COLORS.base[0]};
  }

  > span {
    display: inline-block;
    width: 20%;

    &.separator {
      font-weight: 500;
    }
  }
`
export const InputWrapper = styled.div`
  background-color: ${COLORS.base[90]};
  border-radius: 5px;
  padding: 2px 4px;
  width: fit-content;
  height: 2em;
  display: flex;
  align-items: center;

  > select {
    border: none;
    border-radius: 5px 0 0 5px;
    text-transform: capitalize;
    color: ${COLORS.base[40]};
    background-color: ${COLORS.base[85]};
    height: 2em;
  }

  > input {
    padding-left: 0.4em;
    background-color: ${COLORS.base[90]};
    border: 2px solid ${COLORS.base[85]};
    border-left: none;
    border-radius: 0 5px 5px 0;
    color: ${COLORS.base[0]};
    height: 2em;
  }
`