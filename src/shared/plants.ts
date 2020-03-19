import { ImageRequireSource } from "react-native";

export type Plant = {
  id: number,
  displayName: string,
  image: ImageRequireSource,
};

export const plants: Array<Plant> = [
  {
    id: 1,
    displayName: 'Redcurrant',
    image: require('../images/redcurrants.jpg'),
  },
  {
    id: 2,
    displayName: 'Clematis',
    image: require('../images/clematis-montana.jpg'),
  },
  {
    id: 3,
    displayName: 'New Zealand Myrtle',
    image: require('../images/lophomyrtus-x-ralphii.jpg'),
  },
  {
    id: 4,
    displayName: 'Three-coloured Nasturtium',
    image: require('../images/three-coloured-nasturtium.jpg'),
  },
  {
    id: 5,
    displayName: `Kale 'Redbor'`,
    image: require('../images/kale-redbor.jpg'),
  },
];
