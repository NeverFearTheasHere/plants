import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import styled from 'styled-components';

export {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

export const Link = styled(ReactRouterLink)`
  text-decoration: none;
  padding: 10px;
`;