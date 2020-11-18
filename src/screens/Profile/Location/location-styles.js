import {StyleSheet} from 'react-native';
import {WIDTH, HEIGHT} from 'constants';

const styles = StyleSheet.create({
  container: {width: WIDTH, height: HEIGHT},
  carousel: {
    position: 'absolute',
    zIndex: 10,
    width: WIDTH,
    height: WIDTH / 3,
    bottom: WIDTH / 1.9,
    right: 0,
  },
  carousel_container: {height: 200, width: WIDTH},
  card_actions: {justifyContent: 'flex-end', paddingRight: 20},
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
