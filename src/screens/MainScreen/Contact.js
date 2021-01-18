import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
export default class Cantact extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.img} source={require('./assets/cover.jpg')} />
            <View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{width: 450}}>
                <View>
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}>
                    {/* <Icon name="home" size={30} color="red" /> */}
                    <Text style={styles.h1}>Address:</Text>
                    <Text style={styles.p}>
                      23/76, Sainagar, Dharmavaram, Penukonda, Anantapur, Andhra
                      Pradesh
                    </Text>
                  </Card>
                </View>
                <View>
                  <Card style={{padding: 10, margin: 10, alignSelf: 'center'}}>
                    <Text style={styles.h1}>Contact:</Text>
                    <Text style={styles.p}>
                      Cell: +91-9391745699, +91-8559220528
                    </Text>
                    <Text style={styles.p}>
                      Email: sankarmalagundla@gmail.com
                    </Text>
                  </Card>
                </View>
                <View>
                  <Text style={styles.h2}>Designed and developed by</Text>
                  <Image
                    source={require('./assets/its.jpeg')}
                    style={styles.img2}
                  />
                  <Card
                    style={{
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                      marginBottom: 25,
                    }}>
                    <Text style={styles.h1}>IntelVillageServices LLC</Text>
                    <Text style={styles.p}>
                      IntelVillage Technology Services LLP #4-41 Sri Ramana
                      Garden Duvvuru,Nellore,Andhra Pradesh-524306.
                    </Text>
                    <Text style={styles.p}></Text>
                  </Card>
                </View>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 145,
    width: '103%',
    alignSelf: 'center',
  },
  h1: {
    fontSize: 18,
    padding: 5,
    // marginTop: 30,
    fontWeight: 'bold',
  },
  p: {
    fontSize: 16,
    padding: 10,
    lineHeight: 25,
  },
  img2: {
    height: 100,
    width: 350,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  h2: {
    fontSize: 17,
    padding: 5,
    // marginTop: 30,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
