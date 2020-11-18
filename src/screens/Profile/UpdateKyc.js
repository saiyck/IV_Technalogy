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
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Context} from 'store';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import { BLUE } from 'globals/constants';
//import ImagePicker from 'react-native-image-crop-picker';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const UpdateKyc = () => {
  const {state, handlers} = React.useContext(Context);
  const [fields, setFields] = React.useState({
    name: state.user.name,
    email: state.user.email,
    number: state.user.mobile,
    dob: state.user.dob ? state.user.dob : new Date(),
    aadhar:state.user.aadhar,
    profile:'https://www.oneeducation.org.uk/wp-content/uploads/2020/06/cool-profile-icons-69.png',
    adharfront:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5ZkZZAsuWb5mOi6vakK28Lx2qJhPE3y-YSg&usqp=CAU',
    adharback: 'https://cdn.iconscout.com/icon/free/png-64/aadhaar-2085055-1747945.png',
  });
  const [show, setShow] = React.useState(false);
  
  function updateField(k, v) {
    setShow(false);
    if (k === 'dob') {
      setFields({...fields, [k]: v.nativeEvent.timestamp});
    } else {
      setFields({...fields, [k]: v});
    }
  }
 
  function handleImageSelect(k) {
    ImagePicker.openPicker({
      width:100,
      height:100,
      cropping:true,
      mediaType: 'photo',
    }).then((images) => {
      updateField(k, images.path);
    });
  }

    return (
  
      
      <ScrollView>
     {show && (
        <DateTimePicker
          value={moment(fields.dob).toDate()}
          mode="date"
          onChange={(v)=>updateField('dob',v)}
        />
      )}
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              top: 20,
            }}>
            <TouchableOpacity onPress={()=>handleImageSelect('profile')}
             
              style={{
                height: 105,
                width: 108,
                borderRadius: 100,
                backgroundColor: 'white',
              }}>
              {
                <Image
                  source={{uri:fields.profile}}
                  style={{height: 105, width: 108, borderRadius: 100}}
                />
              }
            </TouchableOpacity>
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
              onChangeText={(v) => updateField('name',v)}
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
              onChangeText={(v) => updateField('email',v)}
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
              underlineColorAndroid="transparent"
              onChangeText={(v) => updateField('number',v)}
            />
          </View> 
          <TouchableNativeFeedback  onPress={() => setShow(true)}>
            <View style={styles.inputContainer}>
            
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/premium/png-64-thumb/otp-2691674-2234637.png',
              }}
            /> 
            <TextInput  
              style={styles.inputs}
              placeholder="DATE OF BIRTH"
              editable={false}
              underlineColorAndroid="transparent"
              value={moment(fields.dob).format('DD-MM-YYYY')}
            />
            </View>
            </TouchableNativeFeedback>
          
          
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
              onChangeText={(aadharid) => this.setState({aadharid})}
            />
          </View>
          <View style={{top: 25}}>
            <View style={styles.ImageSections}>
              <TouchableOpacity onPress={()=>handleImageSelect('adharfront')}>
                <View >
                <Image 
                  source={{uri:fields.adharfront}}
                  style={styles.images}
                />
                  <Text style={{textAlign: 'center'}}>aadhar front image</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleImageSelect('adharback')} >
                <View>
                <Image
                  source={{uri:fields.adharback}}
                  style={styles.images}
                />
                  <Text style={{textAlign: 'center'}}>aadhar back image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri:
                  'https://cdn.iconscout.com/icon/premium/png-64-thumb/address-2231515-1870042.png',
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Address"
              // secureTextEntry={true}
              underlineColorAndroid="white"
              numberOfLines={4}
              onChangeText={(address) => this.setState({address})}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.submitButton]}
            onPress={() =>
              this.onClickListener('please wait for further process')
            }>
            <Text style={styles.submit}>submit</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
};

export default UpdateKyc;
    


const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.lighter,
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
    padding: 20,
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
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
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
