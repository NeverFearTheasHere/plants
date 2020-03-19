import React from 'react';
import styled from 'styled-components/native';
import { Link } from './react-router';
import { Heading, Text } from './shared';
import { plants } from './shared/plants';
import { plantScreenUrl } from './shared/routes';

export const FavouritesScreen = () => (
  <Container>
    <Heading>Favourites</Heading>
    {plants.map(plant =>
      <Row key={plant.id}>
        <Link to={plantScreenUrl(plant.id)}><Text>{plant.displayName}</Text></Link>
      </Row>
    )}
  </Container>
);


const Row = styled.View`
  flex-direction: row;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
