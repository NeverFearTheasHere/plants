import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Text, ExternalLink, Heading } from './shared';
import { useUrlState } from './hooks';
import styled from 'styled-components/native';
import { useMediaQuery } from "react-responsive";
import { limeGreen } from './shared/colours';

const countDecoder = (i: string) => (isNaN(+i) ? undefined : +i);

export const HomeScreen = () => {
  const [count, setCount] = useUrlState("count", 0, countDecoder);
  const isWeb = Platform.OS === 'web';

  const isDesktop = useMediaQuery({
    minDeviceWidth: 1224,
  });

  return (
    <Container>
      <Heading>Home</Heading>
        {isDesktop ? <Text>👋 This is the desktop view</Text> : <Text>This is the mobile view 👋</Text>}
        {isWeb ? <Text>This state uses URL query params:</Text> : <Text>Here is some state:</Text>}
        <Row>
          <Button onPress={() => setCount(count - 1)}><Text>Decrease</Text></Button>
          <Text>{count.toString()}</Text>
          <Button onPress={() => setCount(count + 1)}><Text>Increase</Text></Button>
        </Row>
    </Container>
  );
};

const Row = styled.View`
  flex-direction: row;
`;

const Container = styled.View`
  flex: 1;
  alignItems: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${limeGreen};
  border-radius: 2px;
`;
