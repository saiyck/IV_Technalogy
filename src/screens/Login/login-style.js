import { BLACK, BLUE, GREEN, ORANGE, RED, WHITE } from 'globals/constants';
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
    marginBottom: 50,
    marginTop:-30

  },
  title: {
    fontSize: 15,
    color:GREEN,
    marginTop:-10
  },
  disc: {
    fontSize:13,
    color:GREEN,
    marginTop:5
   },
  sub_title: {
    fontSize: 10,
    marginTop: 10,
    color:BLUE
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    marginBottom: 20,
    borderRadius:10
  },
  phone: {
    marginLeft:60,
    marginRight:60,
    backgroundColor:'#33b53e',
    borderRadius:10
  },
  otp_card: {
  },
  textPhone:{
    height:50,
    width:300,
    marginLeft:10,
    backgroundColor:WHITE,
    borderColor:GREEN,
    borderBottomColor:GREEN
  },
  loginPhone:{
    marginLeft:20,
    backgroundColor:WHITE
  },
  phoneCard:{
    backgroundColor:GREEN ,
    borderRadius:20,
    marginHorizontal:20
  }
});

export default styles;
