import React from 'react';
import { Linking } from "react-native";
import { Text } from './Text';

const openLink = async (url: string) => {
  try {
    const canOpenUrl = await Linking.canOpenURL(url);

    if (!canOpenUrl) {
      console.warn(`Can't open url: ${url}`);
    } else {
      return Linking.openURL(url);
    }
  }
  catch (error) {
    console.error(`An error occurred when opening url: ${url}`, error);
  }
}

type Props = {
  text: string;
  url: string;
}

export const ExternalLink = ({ text, url }: Props) => {
  return (
    <Text onPress={() => openLink(url)}>
      {text}
    </Text>
  );
};
