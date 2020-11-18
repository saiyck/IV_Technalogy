import { ORANGE } from 'globals/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderLeftWidth: 10,
    borderLeftColor: ORANGE,
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

export default styles;
