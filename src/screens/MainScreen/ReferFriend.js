import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
// import Share from 'react-native-share';
export default function Referal() {
  // const myCustomShare = async () => {
  //   const shareOptions = {
  //     message: 'This is a test message',
  //   };
  //   try {
  //     const shareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(shareResponse))
  //   } catch (error) {
  //     console.log('Error=>', error);
  //   }
  // };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/refer1.png')}
        style={styles.img}
      />
      <View>
        <TouchableOpacity style={styles.inviteUser}>
          <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 300,
    marginBottom: 30,
  },
  inviteUser: {
    backgroundColor: 'teal',
    height: 42,
    width: 150,
    // marginTop: 5,
    borderRadius: 20,
    marginBottom: 50,
  },
  inviteText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});