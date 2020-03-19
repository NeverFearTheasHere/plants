import React from 'react';
import styled from 'styled-components/native';
import {
  Router,
  Route,
} from './src/react-router';
import { HomeScreen } from './src/HomeScreen';
import { PlantScreen } from './src/PlantScreen';
import { NotificationsScreen } from './src/Notifications';
import '@expo/match-media'; // this polyfills the window.matchMedia API on iOS & Android
import { FavouritesScreen } from './src/FavouritesScreen';
import { lightGrey } from "./src/shared/colours";
import { MobileNavBar, DesktopNavBar } from "./src/shared";
import { useMediaQuery } from "react-responsive";
import { BackButton } from './src/shared/BackButton';

const App = () => {

  const isDesktop = useMediaQuery({
    minDeviceWidth: 1225,
  });

  return (
    <Router>
      {isDesktop && <DesktopNavBar />}
      <PageContainer>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/favourites" component={FavouritesScreen} />
        <Route path="/notifications" component={NotificationsScreen} />
        <Route path="/plants/:plantId" component={PlantScreen} />
      </PageContainer>
      {!isDesktop && <MobileNavBar />}
      <BackButton/>
    </Router>
  );
};

const PageContainer = styled.View`
  flex: 1;
  background-color: ${lightGrey};
`;

export default App;
