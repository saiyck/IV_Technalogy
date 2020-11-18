import {StyleSheet} from 'react-native';
import {BLUE} from 'globals/constants';

const styles = StyleSheet.create({
  news_container: {
    // marginHorizontal: 15,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: BLUE,
  },
  header: {
    marginTop: 25,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 10,
  },
  comments: {},
  comment_box: {},
  field: {
    flex: 1,
  },
  actions_ctr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
});

export default styles;
