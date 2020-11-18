import {StyleSheet} from 'react-native';
import {GREEN} from 'globals/constants';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderLeftWidth: 10,
    borderLeftColor: GREEN,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  file_type: {
    alignSelf: 'flex-end',
  },
});

export default styles;
