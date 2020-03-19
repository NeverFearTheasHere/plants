import React from 'react';
import styled from 'styled-components/native';
import { RouteComponentProps, RouteProps } from 'react-router';
import { Text, plants } from './shared';
import { Dimensions } from "react-native";

type RouteInfo = RouteProps & {
  plantId: string;
}

type Props = RouteComponentProps<RouteInfo>;

export const PlantScreen = ({ match: { params: { plantId } } }: Props) => {
  const plant = plants.find(p => p.id === Number(plantId));

  if (plant == null) {
    return <Text>Plant not found</Text>
  }

  const { width, height } = Dimensions.get('window');

  return (
    <Container>
      <Text>{plant.displayName}</Text>
      <Image
        maxWidth={width* 0.8}
        maxHeight={height * 0.8}
        source={plant.image}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image<{ maxWidth: number, maxHeight: number}>`
  width: ${({maxWidth}) => `${maxWidth}px;`}
  height: ${({maxHeight}) => `${maxHeight}px;`}
  resizeMode: contain;
`;