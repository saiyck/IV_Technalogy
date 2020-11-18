import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {HEIGHT, WIDTH} from 'constants';
import { RED } from 'globals/constants';

export default () => {
  return (
    <View style={styles.container}>
      <Image style={styles.loader} source={require('../assets/loading.gif')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5,
    width: WIDTH,
    height: HEIGHT / 1.25,
    backgroundColor: '#0000007a',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:RED
  },
  loader: {width: 100, height: 100},
});
