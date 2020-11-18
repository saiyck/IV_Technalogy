import {StyleSheet} from 'react-native';

import {RED} from 'globals/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-evenly',
  },
  record_btn: {
    backgroundColor: RED,
    borderColor: 'black',
    borderWidth: 4,
    marginVertical: 10,
  },
  record_duration: {
    marginTop: 10,
    marginRight: 20,
  },
});

export default styles;
