import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import {Portal,Modal,Button} from 'react-native-paper';
import moment from 'moment';
import {HEIGHT} from 'constants';
import { BLACK, BLUE, WHITE,RED } from 'globals/constants';
//import ImagePicker from 'react-native-image-crop-picker';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const UserProfile = (props) => {
  let {name,photo,email,dob,mobile,aadhar,adharback,adharfront,address} = props.route.params;

  const [open, setOpen] = React.useState(false);
    return (      
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              top: 20,
            }}>
              {
                <Image
                  source={{uri:photo}}
                  style={{height: 105, width: 108, borderRadius: 100}}
                />
              }  
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/free/png-64/user-1648810-1401302.png',
              }}
            />

            <TextInput
              style={styles.inputs}
              placeholder="Full name"
              keyboardType="default"
              underlineColorAndroid="transparent"
              value={name}
              editable={false}
             
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://www.pinclipart.com/picdir/middle/348-3485056_email-icons-transparent-background-email-icon-transparent-background.png',
              }}
            />

            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              value={email}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/premium/png-64-thumb/mobile-1783318-1516815.png',
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Mobile number"
              keyboardType="number-pad"
              maxLength={10}
              editable={false}
              underlineColorAndroid="transparent"
              value={mobile}
            />
          </View> 
            <View style={styles.inputContainer}>
            
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/premium/png-64-thumb/date-of-birth-1995666-1686472.png',
              }}
            /> 
            <TextInput  
              style={styles.inputs}
              placeholder="DATE OF BIRTH"
              editable={false}
              underlineColorAndroid="transparent"
              value={moment(dob).format('DD-MM-YYYY')}
            />
            </View>
          
          
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/free/png-64/aadhaar-2085055-1747945.png',
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Aadhar Id"
              keyboardType="numeric"
              maxLength={12}
              // secureTextEntry={true}
              underlineColorAndroid="transparent"
              editable={false}
              value={aadhar}
            />
          </View>
          <View style={{top: 25}}>
            <View style={styles.ImageSections}>
                <View >
                <Image 
                  style={styles.images}
                  source={{uri:adharfront}}
                />
                  <Text style={{textAlign: 'center'}}>aadhar front image</Text>
                </View>
                <View>
                <Image
                  style={styles.images}
                  source={{uri:adharback}}
                />
                  <Text style={{textAlign: 'center'}}>aadhar back image</Text>
                </View>
            </View>
          </View>

          <View style={styles.inputAddress}>
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/premium/png-64-thumb/address-2231515-1870042.png',
              }}
            />
            <TextInput
              placeholder="Address"
              style={{height:150,color:BLACK}}
              underlineColorAndroid="white"
              multiline={true}
              editable={false}
              numberOfLines={3}
              value={address}
            />
            <View>

            </View>
          </View>
        </View>
      </ScrollView>
    );
};

export default UserProfile;
    


const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: WHITE,
    //flex: 1,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  container: {
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 320,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    top: 40,
  },
  inputAddress: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: 320,
    height: 100,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    top: 40,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    color:BLACK,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    top: 50,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    width: 250,
    borderRadius: 30,
  },
  submitButton: {
    backgroundColor:BLUE,
  },
  submit: {
    color: 'white',
    fontSize: 18,
  },
  field: {
    marginVertical:2,
  },
});
