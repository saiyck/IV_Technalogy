import {StyleSheet} from 'react-native';

import {GREEN, YELLOW} from 'globals/constants';
import {WIDTH, HEIGHT} from 'constants';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  complaint_container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    backgroundColor: GREEN,
  },
  title: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  label: {
    marginBottom: 10,
  },
  field: {
    marginVertical: 15,
  },
  complaint_actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    width: WIDTH,
    bottom: 0,
    zIndex: 1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingVertical: 20,
    backgroundColor: Colors.grey300,
  },
  login_container: {
    marginVertical: 20,
    marginHorizontal: 30,
    paddingVertical: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
