import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
export default class Notification extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/Notification.png')} />
        <Text style={styles.text}>No new Notifications</Text>
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
});
