import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

import styles from './audio-styles';
import {AUDIO_MAX_SECS, GREEN, RED} from 'globals/constants';

export default class AudioRecorder extends Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    duration: 0,
    recordedDuration: 0,
    paused: true,
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      recordedDuration: 0,
      wavFile: 'test.wav',
    };

    AudioRecord.init(options);

    // AudioRecord.on('data', (data) => {
    //   const chunk = Buffer.from(data, 'base64');
    //   console.log('chunk size', chunk.byteLength);
    //   // do something with audio chunk
    // });
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') {
      return;
    }
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    this.props.startedRecording();
    this.interval = setInterval(() => {
      if (this.state.recording) {
        this.setState({duration: this.state.duration + 1}, () => {
          console.info('CONTENT CALLING HER 1');
        });
      }
    }, 1000);
    this.setState(
      {audioFile: '', recording: true, loaded: false, duration: 0},
      () => {
        console.info('CONTENT CALLING HER 2');
      },
    );
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) {
      return;
    }
    let audioFile = await AudioRecord.stop();
    clearInterval(this.interval);
    this.setState(
      {
        audioFile,
        recording: false,
        duration: 0,
        recordedDuration: this.state.duration,
      },
      () => {
        this.props.onComplete(audioFile, this.state.recordedDuration);
        console.info('CONTENT CALLING HER 3');
      },
    );
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', (error) => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({loaded: true}, () => {
          console.info('CONTENT CALLING HER 4');
        });
        return resolve();
      });
    });
  };

  play = async () => {
    this.interval = setInterval(() => {
      this.setState({duration: this.state.duration + 1}, () => {
        console.info('CONTENT CALLING HER 5');
        if (this.state.duration === this.state.recordedDuration) {
          clearInterval(this.interval);
        }
      });
    }, 1000);
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({paused: false}, () => {
      console.info('CONTENT CALLING HER 6');
    });
    Sound.setCategory('Playback');

    this.sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({paused: true}, () => {
        console.info('CONTENT CALLING HER 7');
      });
      // this.sound.release();
    });
  };

  pause = () => {
    clearInterval(this.interval);
    this.sound.pause();
    this.setState({paused: true}, () => {
      console.info('CONTENT CALLING HER 8');
    });
  };

  render() {
    const {recording, paused, audioFile} = this.state;

    if (this.state.duration === AUDIO_MAX_SECS) {
      if (this.state.recording) {
        this.stop();
      } else {
        // this.pause();
      }
    }

    return (
      <View style={styles.container}>
        <IconButton
          size={50}
          style={styles.record_btn}
          color="white"
          onPress={this.start}
          icon="microphone"
          disabled={recording}
        />
        <View style={styles.row}>
          <Text style={styles.record_duration}>
            {this.state.duration} / {this.state.recordedDuration}
          </Text>
          <Button color={RED} onPress={this.stop} icon="stop" disabled={!recording}>
            STOP
          </Button>
          {paused ? (
            <Button color={GREEN} onPress={this.play} icon="play" disabled={!audioFile}>
              PLAY
            </Button>
          ) : (
            <Button onPress={this.pause} icon="pause" disabled={!audioFile}>
              PAUSE
            </Button>
          )}
        </View>
      </View>
    );
  }
}
