import {StyleSheet} from 'react-native';
import {RED} from 'globals/constants';

const styles = StyleSheet.create({
  newsform: {
    padding: 15,
  },
  title_card: {
    marginVertical: 20,
  },
  recorder_card: {
    marginTop: 40,
  },
  field_container: {
    marginVertical: 20,
  },
  record_bt: {
    marginVertical: 20,
  },
  news_container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: RED,
  },
});

export default styles;
