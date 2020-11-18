import {StyleSheet} from 'react-native';
import {RED} from 'globals/constants';

const styles = StyleSheet.create({
  news_container: {
    marginVertical: 5,
  },
  actions: {
    justifyContent: 'space-between',
  },
  action_btn: {
    color: RED,
  },
  user_actions: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default styles;
