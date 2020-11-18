import React from 'react';
import {View, Text} from 'react-native';
import {
  Player,
  Recorder,
  MediaStates,
} from '@react-native-community/audio-toolkit';

import {IconButton} from 'react-native-paper';

import styles from './audio-styles';

const max_duration = 180;
const file_name = 'dummy_file.w4a';

const initial_media_state = {
  disabled: false,
  recording: false,
  error: null,
};

export default function AudioRecorder() {
  const [media_states, setMediaStates] = React.useState(initial_media_state);
  const [progress, setProgress] = React.useState(0);

  const recorder = new Recorder(file_name, {
    bitrate: 256000,
    channels: 2,
    sampleRate: 44100,
    quality: 'max',
  });

  function cancelRecording() {
    recorder.stop();
    setMediaStates({...media_states, disabled: false, recording: false});
  }

  function destroyRecording() {
    recorder.destroy();
    setMediaStates({...media_states, disabled: false, recording: false});
  }

  function handleToggle() {
    setMediaStates({...media_states, disabled: true});
    console.info('STATE RECORDER', recorder.state);
    if (recorder.isPrepared) {
      setMediaStates({
        ...media_states,
        disabled: true,
      });
      if (!media_states.recording) {
        alert('START RECORDING');
        recorder.record((err) => {
          if (err) {
            setMediaStates({
              ...media_states,
              disabled: false,
              recording: false,
              error: err.message,
            });
          } else {
            setMediaStates({
              ...media_states,
              disabled: false,
              recording: true,
              error: null,
            });
          }
        });
      } else {
        alert('STOP RECORDING');
        recorder.stop((err) => {
          if (err) {
            setMediaStates({
              ...media_states,
              disabled: false,
              recording: false,
              error: err.message,
            });
          } else {
            setMediaStates({
              ...media_states,
              disabled: false,
              recording: false,
              error: null,
            });
          }
        });
      }
    }
  }

  return (
    <View style={styles.recorder}>
      <Text>
        {JSON.stringify({
          media_states,
          progress,
        })}
      </Text>
      <IconButton
        size={60}
        disabled={media_states.disabled}
        icon={media_states.recording ? 'stop' : 'microphone'}
        onPress={handleToggle}
      />
      <View style={styles.action_container}>
        <Text>{progress}</Text>
      </View>
    </View>
  );
}
