import styled from 'styled-components';
import {COLORS} from '../constants/UI';

export const DataTable = styled.table`
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: ${COLORS.base[40]};
  color: ${COLORS.base[85]};
  text-transform: uppercase;
  font-size: 12px;
  height: 32px;
  text-align: center;
`;

export const TableBody = styled.tbody`
  background-color: ${COLORS.base[85]};
  color: ${COLORS.base[40]};
  font-size: 14px;
  line-height: 20px;
`;

export const TableRow = styled.tr`
  color: ${COLORS.base[40]};
  height: 60px;
  line-height: 20px;
`;
