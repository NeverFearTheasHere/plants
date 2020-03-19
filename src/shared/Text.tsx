import styled from 'styled-components/native';
import { darkGrey } from './colours';

export const Text = styled.Text<{colour?: string}>`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  color: ${({colour}) => colour || darkGrey};
`;
