import { BLUE } from 'globals/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
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

export default styles;
