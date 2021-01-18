import { BLACK, BLUE, GREEN } from 'globals/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  container: {
    padding: 5,
    marginTop: 10,
  },
  profile_container: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3, 
  },
  image_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  name: {
    fontSize: 30,
    marginBottom: 10,
  },
  field: {
    marginVertical: 10,
  },
  mail: {
    fontSize: 20,
    marginBottom: 5,
  },
  phone: {
    fontSize: 20,
  },
  edit: {
    marginTop: 10,
  },
  menu: {
    marginTop: 40,
  },
  menu_container: {
    fontSize: 15,
    color:BLACK,
    marginLeft:5
    // color: 'grey',
  },
  menu_list: {
    backgroundColor: 'white',
    marginTop: 10,
    elevation: 1,
    borderRadius: 4,
  },
});

export default styles;
