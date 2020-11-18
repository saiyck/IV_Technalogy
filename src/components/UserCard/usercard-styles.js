import {StyleSheet} from 'react-native';
import { BLUE } from 'globals/constants';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderLeftWidth: 10,
    borderLeftColor: BLUE,
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

export default styles;
