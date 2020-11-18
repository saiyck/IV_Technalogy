import { GREEN } from 'globals/constants';
import {StyleSheet} from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  schedule: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  schedule_icon: {
    fontSize: 15,
    marginRight: 10,
    color: Colors.black,
  },
  schedule_text: {
    fontSize: 15,
    marginLeft: 10,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  meta_title: {
    fontSize: 15,
    marginBottom: 3,
    color: Colors.grey600,
  },
  meta: {
    marginVertical: 10,
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  gallery_image: {
    height: 150,
    width: 150,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  video: {
    height: '80%',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    padding: 0,
  },
});

export default styles;
