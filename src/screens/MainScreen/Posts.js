import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
export default class Posts extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/post.png')} style={styles.img} />
        <Text style={styles.text}>No new posts</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  img: {
    height: 180,
    width: 350,
  },
});
