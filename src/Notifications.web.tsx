import React from 'react';
import styled from 'styled-components/native';
import { Heading, Text } from './shared';

export const NotificationsScreen = () => {
  return (
    <Container>
      <Heading>Notifications</Heading>
      <Text>Notifications aren't available on the web</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
