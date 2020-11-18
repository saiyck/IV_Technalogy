import React from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
import {RNCamera} from 'react-native-camera';
import {IconButton, Card, Button} from 'react-native-paper';

import {VIDEO_MIN_SECS, VIDEO_MAX_SECS} from 'globals/constants';
import styles from './video-styles';

const CaptureLuggage = (props) => {
  const [image, setImage] = React.useState({
    recording: false,
    uri: null,
    duration: 0,
  });
  const [duration, setDuration] = React.useState(0);
  const [recorded_duration, setRecordedDuration] = React.useState(0);
  const [controls, setControls] = React.useState({paused: true});
  const [selfie, setSelfie] = React.useState(false);
  const timer = {};

  const recordVideo = async (camera) => {
    if (camera) {
      const options = {
        quality: RNCamera.Constants.VideoQuality['480p'],
        maxDuration: VIDEO_MAX_SECS,
      };
      if (!image.recording) {
        camera.recordAsync(options).then((data) => {
          setImage({...image, uri: data.uri});
        });
        setImage({...image, recording: true});
      } else {
        camera.stopRecording();
        setRecordedDuration(duration);
        setImage({...image, recording: false});
      }
    }
  };

  React.useEffect(() => {
    if (image.recording) {
      timer.current = setInterval(() => {
        setDuration((d) => d + 1);
        console.info('DURATION', duration);
      }, 1000);
    } else {
      clearInterval(timer.current);
      setDuration(0);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [image.recording]);

  const handleCameraAction = (type) => {
    console.info('TAKE AKING', type);
    switch (type) {
      case 'retake':
        setRecordedDuration(0);
        setControls({paused: true});
        setDuration(0);
        setImage({uri: null, recording: false, duration: 0});
        break;
      case 'upload':
        if (recorded_duration < VIDEO_MIN_SECS && !props.preview) {
          alert(`DURATION SHOULD BE ATLEAST ${VIDEO_MIN_SECS} seconds`);
          return;
        }
        props.onFinish(image.uri);
        break;
      case 'toggle':
        setControls({paused: !controls.paused});
        break;
    }
  };

  return (
    <View style={styles.viewContainer}>
      {!image.recording && (image.uri || props.preview) ? (
        <Card style={styles.video_card}>
          <Card.Content style={styles.video_frame}>
            <Video
              style={styles.player}
              resizeMode="contain"
              repeat
              source={{uri: image.uri ? image.uri : props.uri}}
              paused={controls.paused}
            />
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <IconButton onPress={props.onClose} icon="arrow-left" />
            <Button
              icon={controls.paused ? 'play' : 'pause'}
              mode="outlined"
              onPress={() => handleCameraAction('toggle')}>
              {controls.paused ? 'PLAY' : 'PAUSE'}
            </Button>
            <Button
              icon="reload"
              mode="outlined"
              onPress={() => handleCameraAction('retake')}>
              RETAKE
            </Button>
            <Button
              icon="upload"
              mode="contained"
              onPress={() => handleCameraAction('upload')}>
              UPLOAD
            </Button>
          </Card.Actions>
        </Card>
      ) : (
        <RNCamera
          defaultVideoQuality="480p"
          type={selfie ? 'front' : 'back'}
          style={styles.camera_view}>
          {({camera, status, recordAudioPermissionStatus}) => {
            return (
              <>
                <Text style={styles.record_duration}>{duration}</Text>
                <IconButton
                  icon="camera"
                  disabled={image.recording}
                  color="white"
                  size={30}
                  style={styles.selfie_btn}
                  onPress={() => setSelfie(!selfie)}
                />
                <IconButton
                  icon={image.recording ? 'stop' : 'record'}
                  color="white"
                  size={45}
                  style={styles.record_btn}
                  onPress={() => recordVideo(camera)}
                />
              </>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
};

export default CaptureLuggage;
