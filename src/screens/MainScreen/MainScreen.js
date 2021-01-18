import routes from 'navigation/routes';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
export default class Profile extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require('./assets/Component.png')}
          style={styles.img}>
          <View style={styles.TextView}>
            <Text style={styles.h1}>Malagundla SankaraNarayana</Text>
            <Text style={styles.p}>
              Minister for Roads &{'\n'}{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buildings
            </Text>
            <Text style={styles.p1}>MLA for penugonda</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(routes.about)}>
              <Image
                style={styles.img1}
                source={require('./assets/sankar.png')}
              />
              <Text style={styles.imgText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(routes.navarathnalu)}>
              <Image
                style={styles.img1}
                source={require('./assets/navalogo.png')}
              />
              <Text style={styles.imgText}>Navaratnaalu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(routes.profile)}>
              <Image
                style={styles.img1}
                source={{
                  uri:
                    'https://cdn.iconscout.com/icon/premium/png-64-thumb/profile-2388152-2002289.png',
                }}
              />
              <Text style={styles.imgText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.row1}></View>
        <View style={styles.row1}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(routes.posts)}>
            <Image
              style={styles.img1}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8HBZTb8TlJoEJ0bMDzAGLn2FMipaXb888MA&usqp=CAU',
              }}
            />
            <Text style={styles.imgText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(routes.notifications)}>
            <Image
              style={styles.img1}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBKZQLQLF6z7YBBSMKYYsNRKKdN2Of0Y4xA&usqp=CAU',
              }}
            />
            <Text style={styles.imgText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(routes.gallary)}>
            <Image
              style={styles.img1}
              source={{
                uri:
                  'https://cdn4.iconfinder.com/data/icons/gradient-ui-1/512/gallery-512.png',
              }}
            />
            <Text>Gallery</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate(routes.referfriend)}>
            <Image
              style={styles.img1}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIm28NNhO5Ix75y_3rakWSH55x3uo3JmZeMA&usqp=CAU',
              }}
            />
            <Text style={styles.imgText}>Refer friend</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.img1}
              source={{
                uri:
                  'https://www.iconarchive.com/download/i99382/dtafalonso/android-lollipop/Settings.ico',
              }}
            />
            <Text style={styles.imgText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(routes.contact)}>
            <Image
              style={styles.img1}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/premium/png-64-thumb/support-129-485011.png',
              }}
            />
            <Text style={styles.imgText}>Contact info</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  img: {
    width: '100.3%',
    height: 540,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  TextView: {
    alignContent: 'flex-end',
  },
  h1: {
    // textAlign: 'left',
    marginTop: 275,
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  p: {
    // textAlign: 'left',
    marginLeft: 50,
    fontSize: 15,

    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  p1: {
    // textAlign: 'left',
    marginLeft: 30,
    fontSize: 15,

    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  row1: {
    padding:10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  row2:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:18
  },
  row: {
    // display: 'flex',
    padding: 10,
    marginTop: 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
    top: 65,
  },
  img1: {
    height: 30,
    width: 30,
    borderRadius: 17.5,
    alignSelf: 'center',
    borderWidth: 2,
    // borderRadius: 5,
    borderColor: '#ddd',
  },
  imgText: {
    fontSize: 14,
    fontFamily: 'Roboto',
  },
});
