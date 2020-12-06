import React from 'react';
import {View, Text,Image} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  Provider,
  Card,
  TextInput,
} from 'react-native-paper';

import * as Animatable from 'react-native-animatable';

import {Context} from 'store';
import styles from './login-style';
// import Background from './assets/background';
import routes from 'navigation/routes';
import Loading from 'components/Loading';
import { BLUE ,GREEN,WHITE} from 'globals/constants';

const initial_state = {
  phone: '',
  otp: '',
};

export default function Login(props) {
  const {handlers} = React.useContext(Context);
  const [field, setField] = React.useState(initial_state);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState(false);

  function handleLogin(type) {
    <Loading/>
    setLoading(true);
    handlers.login(type, (ok) => {
      
      if (ok) {
        setLoading(false);
        props.navigation.reset({
          index: 0,
          routes: [{name: routes.profile}],
        });
      }
    });
  }

  const handleChange = (k) => (v) => {
    setField({...field, [k]: v});
  };

  const toggleModal = () => {
    if (modal) {
      setOtp(false);
      setField(initial_state);
    }
    setModal(!modal);
  };

  function sendOtp() {
    setLoading(true);
    if (/[0-9]{10}/.test(field.phone)) {
      handlers.otpLogin({mobile: field.phone}, () => {
        setLoading(false);
        setOtp(true);
      });
    } else {
      setLoading(false);
      alert('PHONE NUMBER INVALID!');
    }
  }

  function verifyOtp() {
    setLoading(true);
    if (field.otp.length) {
      handlers.verifyOtp({mobile: field.phone, otp: field.otp}, (not_ok) => {
        setLoading(false);
        if (!not_ok) {
          props.navigation.reset({
            index: 0,
            routes: [{name: routes.profile}],
          });
        }
      });
    } else {
      alert('PLEASE ENTER VALID OTP');
      // VERIFY OTP
      setLoading(false);
    }
  }

  return (
    <>
      <Portal>
        <Modal visible={modal} onDismiss={() => toggleModal()}>
          <View style={styles.otp_card}>
            {otp ? (
              <Card  style={styles.phoneCard}>
                <Card.Title title="ENTER OTP" titleStyle={{marginLeft:20,color:WHITE}}/>
                <Card.Content>
                  <TextInput
                    style={styles.textPhone}
                    value={field.otp}
                    theme={
                      {
                        colors:{
                          primary:GREEN
                        }
                      }
                    }
                    placeholderTextColor={GREEN}
                    keyboardType="phone-pad"
                    onChangeText={handleChange('otp')}
                    placeholder="YOUR OTP"
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    style={styles.loginPhone}
                    onPress={verifyOtp}
                    disabled={loading}
                    color={GREEN}
                    loading={loading}>
                    VERIFY
                  </Button>
                </Card.Actions>
              </Card>
            ) : (
              <Card style={styles.phoneCard}>
                <Card.Title title="ENTER PHONE NUMBER" titleStyle={{marginLeft:20,color:WHITE}} />
                <Card.Content>
                  <TextInput
                    style={styles.textPhone}
                    value={field.phone}
                    theme={
                      {
                        colors:{
                          primary:GREEN
                        }
                      }
                    }
                    placeholderTextColor={GREEN}
                    underlineColorAndroid={Button}
                    onChangeText={handleChange('phone')}
                    keyboardType="phone-pad"
                    placeholder="PHONE NUMBER"
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    style={styles.loginPhone}
                    onPress={sendOtp}
                    disabled={loading}
                    color={GREEN}
                    loading={loading}>
                    LOGIN
                  </Button>
                </Card.Actions>
              </Card>
            )}
          </View>
        </Modal>
      </Portal>
      <View style={styles.screen}>
        <View style={styles.background}>{/* <Background /> */}</View>
        <Animatable.View
        animation="slideInDown"
        style={styles.image}>
          <View style={styles.login}>
          <Image source={require('./assets/narayana.png')}
          borderRadius={5}
          style={{width:150,height:150}}/>
            <Text style={styles.title}>MALAGUNDLA SHANKAR NARAYANA</Text>
            <Text style={styles.disc}>BC MINISTER PENUKONDA</Text>
            <Text style={styles.sub_title}>LOGIN, TO GET STARTED</Text>
          </View>
          <View 
          style={styles.login_card}>
            <Button
              icon="facebook"
              style={styles.button}
              onPress={() => handleLogin('fb')}
              color="#4267B2"
              mode="contained">
              FACEBOOK
            </Button>
            <Button
              icon="google"
              mode="contained"
              color="#DB4437"
              onPress={() => handleLogin('google')}
              style={styles.button}>
              GOOGLE
            </Button>
          </View>
            <Button
            icon="phone" 
            mode="contained"
            style={styles.phone}
             onPress={toggleModal}>LOGIN WITH PHONE</Button>
        </Animatable.View>
      </View>
    </>
  );
}
