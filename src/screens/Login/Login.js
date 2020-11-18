import React from 'react';
import {View, Text} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  Provider,
  Card,
  TextInput,
} from 'react-native-paper';

import {Context} from 'store';
import styles from './login-style';
// import Background from './assets/background';
import routes from 'navigation/routes';
import Loading from 'components/Loading';

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
              <Card>
                <Card.Title title="ENTER OTP" />
                <Card.Content>
                  <TextInput
                    value={field.otp}
                    keyboardType="phone-pad"
                    onChangeText={handleChange('otp')}
                    placeholder="YOUR OTP"
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={verifyOtp}
                    disabled={loading}
                    loading={loading}>
                    VERIFY
                  </Button>
                </Card.Actions>
              </Card>
            ) : (
              <Card>
                <Card.Title title="ENTER PHONE NUMBER" />
                <Card.Content>
                  <TextInput
                    value={field.phone}
                    onChangeText={handleChange('phone')}
                    keyboardType="phone-pad"
                    placeholder="PHONE NUMBER"
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={sendOtp}
                    disabled={loading}
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
        <View style={styles.image}>
          <View style={styles.login}>
            <Text style={styles.title}>CERTITUDE</Text>
            <Text style={styles.sub_title}>LOGIN, TO GET STARTED</Text>
          </View>
          <View style={styles.login_card}>
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
          <View style={styles.otp_container}>
            <Button onPress={toggleModal}>LOGIN USING PHONE</Button>
          </View>
        </View>
      </View>
    </>
  );
}
