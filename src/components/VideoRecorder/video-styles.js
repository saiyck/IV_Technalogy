import {StyleSheet} from 'react-native';
import {BLACK, YELLOW, RED} from 'globals/constants';

const landmarkSize = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: BLACK,
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: YELLOW,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: YELLOW,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: RED,
    justifyContent: 'center',
  },
  textBlock: {
    color: RED,
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  selfie_btn: {
    // backgroundColor: ,
    position: 'absolute',
    bottom: 30,
    left: 20,
    alignSelf: 'center',
  },
  record_btn: {
    backgroundColor: RED,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  camera_view: {
    height: '100%',
    width: '100%',
  },
  image_card: {
    height: '100%',
  },
  video_frame: {
    width: '100%',
    height: '85%',
    backgroundColor: BLACK,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    height: '100%',
    margin: 'auto',
    width: '80%',
  },
  title: {
    color: BLACK,
  },
  video_card: {
    height: '100%',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  record_duration: {
    fontSize: 40,
    marginLeft: 20,
    marginTop: 20,
  },
});

export default styles;
