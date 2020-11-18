import {StyleSheet} from 'react-native';
import {BLUE, ORANGE, WHITE} from 'globals/constants';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  meeting_container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    backgroundColor: ORANGE,
  },
  fabView:{
  flexDirection:'row',
   position: 'absolute',
   margin: 16,
   right: 0,
   bottom: 0,
  },
  fabText:{
  color:ORANGE,
  padding:5,
  marginBottom:25,
  fontSize:10,
  fontWeight:"400",
  },
  title: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  label: {
    marginBottom: 10,
  },
  field: {
    marginVertical: 15,
  },
  login_container: {
    marginVertical: 20,
    marginHorizontal: 30,
    paddingVertical: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
