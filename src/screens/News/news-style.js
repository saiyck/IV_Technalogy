import {StyleSheet} from 'react-native';
import {GREEN, RED} from 'globals/constants';

const styles = StyleSheet.create({
  newsform: {
    padding: 15,
  },
  title_card: {
    marginVertical: 20,
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
  recorder_card: {
    marginTop: 40,
  },
  field_container: {
    marginVertical: 20,
  },
  record_bt: {
    marginVertical: 20,
  },
  imageUploader:{
    flexDirection:'row'
  },
  send:{
    marginRight:250,
    backgroundColor:GREEN,
  },
  news_container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: GREEN,
  },
});

export default styles;
