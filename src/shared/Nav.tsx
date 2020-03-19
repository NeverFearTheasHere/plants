import { darkGrey, lightGrey, limeGreen } from "../shared/colours";
import { Link, useHistory, useRouteMatch } from "../react-router";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { plantScreenUrl } from './routes';
import { Notifications } from 'expo';
import { Notification } from '../Notifications';

type Props ={
  isActive: boolean;
  iconName: string;
  label: string;
  path: string;
}


export const MobileNavBar = () => {
  const homeMatch = useRouteMatch({
    path: '/',
    exact: true,
  });

  const favouritesMatch = useRouteMatch({
    path: ['/favourites', '/plants/:plantId'],
  });

  const notificationsMatch = useRouteMatch({
    path: '/notifications',
  });

  const history = useHistory();

  const handleNotification = (notification: Notification) => {
    const plantId: number = Number(notification.data.plantId);
    if (!isNaN(plantId)) {
      history.push(plantScreenUrl(plantId));
    }
  };

  useEffect(() => {
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
  }, []);

  return (
    <MobileNavBarContainer>
      <NavItem path="/" iconName="md-home" label="Home" isActive={homeMatch != null}/>
      <NavItem path="/favourites" iconName="md-heart" label="Favourites" isActive={favouritesMatch != null}/>
      <NavItem path="/notifications" iconName="md-notifications" label="Notifications"
               isActive={notificationsMatch != null}/>
    </MobileNavBarContainer>
  );
};

export const DesktopNavBar = () => {
  const homeMatch = useRouteMatch({
    path: '/',
    exact: true,
  });

  const favouritesMatch = useRouteMatch({
    path: ['/favourites', '/plants/:plantId'],
  });

  const notificationsMatch = useRouteMatch({
    path: '/notifications',
  });

  return (
    <DesktopNavBarContainer>
      <HeaderImageContainer>
        <HeaderImage
          source={require('../../assets/ghyston-logo.png')}
        />
      </HeaderImageContainer>
      <NavItems>
        <NavItem path="/" iconName="md-home" label="Home" isActive={homeMatch != null}/>
        <NavItem path="/favourites" iconName="md-heart" label="Favourites" isActive={favouritesMatch != null}/>
        <NavItem path="/notifications" iconName="md-notifications" label="Notifications"
                 isActive={notificationsMatch != null}/>
      </NavItems>
    </DesktopNavBarContainer>
  );
};

const NavItem = ({ isActive, iconName, label, path }: Props) => (
  <Link to={path}>
    <NavItemContainer>
      <Ionicons name={iconName} size={24} color={isActive ? limeGreen : lightGrey} />
      <NavText isActive={isActive}>{label}</NavText>
    </NavItemContainer>
  </Link>);

const DesktopNavBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background-color: ${darkGrey};
`;

const HeaderImageContainer = styled.View`
  padding: 40px;
`;

const HeaderImage = styled(Image)`
  height: 100px;
  width: 180px;
  resize-mode: contain;
`;

const NavItems = styled.View`
  flex-direction: row;
  padding: 40px;
`;

const MobileNavBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: ${darkGrey};
`;

const NavItemContainer = styled.View`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100px;
`;

export const NavText = styled.Text<{ isActive: boolean }>`
  font-size: 12px;
  color: ${({ isActive }) => isActive ? limeGreen : lightGrey} 
`;
