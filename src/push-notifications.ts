import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { API_BASE_URL } from './config';
import { fetchJson } from './shared/fetchJson';
import { Platform } from 'react-native';

export type User = {
  pushToken: string,
  name: string,
};

export const getPushTokenAsync = async (): Promise<string> => {
  if (Platform.OS === 'web') {
    // see https://github.com/expo/expo/pull/6590
    console.warn('Push notifications not supported on web yet');
    return;
  }

  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    console.warn('Permission to send push notifications not granted');
    return;
  }

  return await Notifications.getExpoPushTokenAsync();
};

export const storePushTokenForUserAsync = async (name: string, pushToken: string): Promise<void> => {
  console.log(`Storing ${pushToken} for user ${name}`);
  const requestBody: User = { pushToken, name };
  await fetchJson(`${API_BASE_URL}/register`, 'post', requestBody);
};

export const tryGetUserByPushTokenAsync = async (pushToken: string): Promise<User | null> => {
  return fetchJson(`${API_BASE_URL}/user/${encodeURI(pushToken)}`);
};
