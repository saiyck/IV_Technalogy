import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  schedule: {
    marginVertical: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  schedule_icon: {
    fontSize: 20,
    color: 'black',
  },
  schedule_text: {
    fontSize: 15,
    // color: '#9e9e9e',
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
    marginBottom: 10,
  },
  meta: {
    marginVertical: 15,
  },
});

export default styles;
