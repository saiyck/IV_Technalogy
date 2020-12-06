import {StyleSheet} from 'react-native';
import { BLUE, GREEN } from 'globals/constants';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderLeftWidth: 10,
    borderLeftColor: GREEN,
    minHeight:80
  },
  actions: {
    justifyContent: 'flex-end',
  },
  userCard:{
    flexDirection:"row",
    justifyContent:"flex-start"
  },
  userImage:{
    width:60,
    height:60,
    borderRadius:10,
    marginTop:5,
    marginLeft:5
  },
  userText:{
    flexDirection:"column"
  },
  nameText:{
    marginTop:10,
    marginLeft:10,
    fontWeight:"500",
    fontSize:20
  },
  emailText:{
    marginLeft:10,
    fontSize:12
  }
});

export default styles;
