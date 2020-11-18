import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
  },
  sub_title: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 60,
    marginHorizontal: 40,
    borderRadius: 5,
    elevation: 3,
  },
  login_card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    marginBottom: 20,
  },
  otp_container: {
    marginTop: 20,
  },
  otp_card: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 30,
  },
});

export default styles;
