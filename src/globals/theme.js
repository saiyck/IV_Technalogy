import {DefaultTheme} from 'react-native-paper';
import {primary_color, secondary_color} from './constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: primary_color,
    // accent: secondary_color,
  },
};

export default theme;
