import { BLACK, BLUE, GREEN, RED, TGREEN, WHITE } from 'globals/constants';
import {StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  audioform: {
    padding:20,
    backgroundColor:WHITE
  },
  title_card: {
    marginVertical: 20,
  },
  recorder_card: {
    marginTop: 20,
  },
  field_container: {
    marginVertical: 20,
  },
  audio_text:{
    color:GREEN,
    backgroundColor:WHITE
  },
  imageUploader:{
    flexDirection:'row'
  },
  send:{
    marginRight:250,
    backgroundColor:WHITE,
    marginBottom:20
  },
  records: {
    marginVertical: 20,
    height:30,
    color:BLUE
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  gallery_image: {
    height: 150,
    width: 150,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});

export default styles;
