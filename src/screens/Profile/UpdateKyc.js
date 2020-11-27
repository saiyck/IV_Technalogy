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
const re = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mobile: /[0-9]{10}/,
};
const UpdateKyc = (props) => {
  const [show, setShow] = React.useState(false);
  const [fields, setFields] = React.useState({
    name: props.user.name,
    email: props.user.email,
    mobile: props.user.mobile,
    dob: props.user.dob ? props.user.dob : new Date(),
    aadhar:props.user.aadhar,
    photo:props.user.photo ? props.user.photo :'https://www.oneeducation.org.uk/wp-content/uploads/2020/06/cool-profile-icons-69.png',
    adharfront:props.user.adharfront ? props.user.adharfront:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5ZkZZAsuWb5mOi6vakK28Lx2qJhPE3y-YSg&usqp=CAU',
    adharback:props.user.adharback ? props.user.adharback : 'https://cdn.iconscout.com/icon/free/png-64/aadhaar-2085055-1747945.png',
    address:props.user.address,
  });
  
  
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
  function handleSubmit() {
    let ok = true;
    Object.keys(fields).forEach((k) => {
      if (ok) {
        if (!fields[k] || fields[k] === '') {
          ok = false;
        }

        if (ok) {
          switch (k) {
            case 'email':
              ok = re.email.test(fields[k].toLowerCase());
              break;
            case 'mobile':
              ok = re.mobile.test(fields[k].toLowerCase());
              break;
          }
        }
      }
    });

    if (!ok) {
      alert('SOME FIELDS ARE NOT VALID!');
    } else {
      if (fields.dob) {
        fields.dob = new Date(fields.dob);
      }
      props.onFinish(fields);
    }
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
                  source={{uri:fields.photo}}
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
              value={fields.name}
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
              value={fields.email}
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
              value={fields.mobile}
              underlineColorAndroid="transparent"
              onChangeText={(v) => updateField('mobile',v)}
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
              value={fields.aadhar}
              underlineColorAndroid="transparent"
              onChangeText={(v) => updateField('aadhar',v)}
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
              placeholder="Address"
              // secureTextEntry={true}
              underlineColorAndroid="white"
              value={fields.address}
              multiline={true}
              numberOfLines={3}
              onChangeText={(v) => updateField('address',v)}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.submitButton]}
            onPress={handleSubmit}>
            <Text style={styles.submit}>update</Text>
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
