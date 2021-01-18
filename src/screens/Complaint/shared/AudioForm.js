import React from 'react';
import {View, ScrollView, Image, TouchableHighlight,ImageBackground} from 'react-native';
import {
  Card,
  Button,
  TextInput,
  Portal,
  Modal,
  HelperText,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-community/picker';

import {Context} from 'store';
import AudioRecorder from 'components/AudioRecorder';
import styles from './form-styles';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESC_LENGTH,
  MAX_DESC_LENGTH,
  AUDIO_MIN_SECS,
  RED,
  GREEN,
  WHITE,
  TGREEN,
  BLUE,
} from 'globals/constants';
import Loading from 'components/Loading';
import {HEIGHT} from 'constants';
// TODO: to upload files
// https://stackoverflow.com/questions/29489502/how-to-upload-file-to-server-using-react-native

const initial_field_state = {
  title: '',
  description: '',
  audio: '',
  lang_code: 'te-IN',
  images: [],
};

const options = [
  {label: 'TAMIL', value: 'ta-IN'},
  {label: 'TELUGU', value: 'te-IN'},
];

export default function AudioForm(props) {
  const {handlers} = React.useContext(Context);
  const [fields, setField] = React.useState(initial_field_state);
  const [recorded_duration, setRecordedDuration] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [show, setShow] = React.useState(false);

  function updateField(k, v) {
    setField({...fields, [k]: v});
  }

  function handleImageSelect() {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 4,
      includeBase64: true,
      mediaType: 'photo',
    }).then((images) => {
      updateField('images', images);
    });
  }

  function submitComplaint() {
    let ok = true;
    setLoading(true);

    console.info('RECORDED DURATION', recorded_duration, AUDIO_MIN_SECS);

    if (recorded_duration < AUDIO_MIN_SECS) {
      setLoading(false);
      alert(`AUDIO SHOULD BE ATLEAST ${AUDIO_MIN_SECS} SECONDS!`);
      return;
    }

    Object.keys(fields).forEach((k) => {
      if (k === 'images') {
      } else {
        if (!fields[k]) {
          ok = false;
        }

        if (
          k === 'title' &&
          (fields[k].length < MIN_TITLE_LENGTH ||
            fields[k].length > MAX_TITLE_LENGTH)
        ) {
          ok = false;
        }
        if (
          k === 'description' &&
          (fields[k].length < MIN_DESC_LENGTH ||
            fields[k].length > MAX_DESC_LENGTH)
        ) {
          ok = false;
        }
      }
    });
    if (ok) {
      handlers.createComplaint({...fields, type: 'audio'}, () => {
        setLoading(false);
        handlers.getUserComplaints();
        props.navigation.goBack();
      });
    } else {
      setLoading(false);
      alert('SOME FIELDS ARE INVALID!');
      return;
    }
  }

  return (
    <>
      <Portal>
        <Modal visible={Boolean(show)} onDismiss={() => setShow(false)}>
          {show && (
            <Image
              resizeMode="contain"
              style={{height: HEIGHT / 2}}
              source={{uri: `data:${show?.mime};base64,${show?.data}`}}
            />
          )}
          <Button mode="contained" color={RED} onPress={() => setShow(false)}>
            CLOSE
          </Button>
        </Modal>
      </Portal>
      <ScrollView>
        <View style={styles.audioform}>
          {loading && <Loading />}
          <Card style={styles.title_card}>
            <ImageBackground source={require('./assets/tailcolor.jpg')} style={{justifyContent:'center'}}>
            <Card.Title
              title="RECORD AUDIO HERE"
              titleStyle={{color:TGREEN}}
              subtitle="start recording and stop"
              subtitleStyle={{color:TGREEN}}
            />
            <Card.Content>
              <AudioRecorder
                startedRecording={() => setRecording(true)}
                onComplete={(file, duration) => {
                  setRecording(false);
                  updateField('audio', file);
                  setRecordedDuration(duration);
                }}
              />
            </Card.Content>
            <Card.Content style={styles.field_container}>
              <TextInput
                style={styles.audio_text}
                onChangeText={(v) => updateField('title', v)}
                label="TITLE"
                mode='outlined'
                maxLength={MAX_TITLE_LENGTH}
                placeholder="YOUR COMPLAINT REGARDING"
                theme={{
                  colors:{
                    placeholder:TGREEN,
                    primary:TGREEN,
                  }
                }}
              />
              <HelperText>
                {fields.title.length} / {MAX_TITLE_LENGTH}
              </HelperText>
            </Card.Content>
            <Card.Content style={styles.field_container}>
              <TextInput
                label="DESCRIPTION"
                mode='outlined'
                style={{color:TGREEN,backgroundColor:WHITE}}
                maxLength={MAX_DESC_LENGTH}
                onChangeText={(v) => updateField('description', v)}
                multiline
                numberOfLines={4}
                placeholder="SOME MORE INPUTS ON YOUR COMPLAINT"
                theme={{
                  colors:{
                    placeholder:TGREEN,
                    primary:TGREEN,
                  }
                }}
              />
              <HelperText>
                {fields.description.length} / {MAX_DESC_LENGTH}
              </HelperText>
            </Card.Content>
            <Card.Content>
              <Picker 
                style={{color:TGREEN}}
                selectedValue={fields.lang_code}
                onValueChange={(v) => updateField('lang_code', v)}>
                {options.map((opt) => (
                  <Picker.Item {...opt} />
                ))}
              </Picker>
            </Card.Content>
            <Card.Content style={styles.gallery}>
              {fields.images.map((img) => (
                <TouchableHighlight onPress={() => setShow(img)}>
                  <Image
                    style={styles.gallery_image}
                    resizeMode="cover"
                    source={{uri: `data:${img.mime};base64,${img.data}`}}
                  />
                </TouchableHighlight>
              ))}
            </Card.Content>
            <Card.Content style={styles.field_container}>
            <View style={styles.imageUploader}>
              <Image source={require('./assets/imageUploader.png')}
              style={{width:40,height:40,marginLeft:60}}/>
              <Button
                color={TGREEN}
                onPress={handleImageSelect}
                disabled={fields.images.length === 4 || recording}>
                ADD IMAGES
              </Button>
              </View>
            </Card.Content>
            <Card.Actions>
            <Button
                style={styles.send}
                onPress={submitComplaint}
                color={TGREEN}
                disabled={loading || recording}
                icon="check">
                SUBMIT
              </Button> 
            </Card.Actions>
          </ImageBackground>
          </Card>
          <Card />
        </View>
      </ScrollView>
    </>
  );
}
