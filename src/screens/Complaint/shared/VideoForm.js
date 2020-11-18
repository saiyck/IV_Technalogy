import React from 'react';
import {View, Image, TouchableHighlight} from 'react-native';
import {
  Card,
  Button,
  TextInput,
  Portal,
  Modal,
  HelperText,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import VideoRecorder from 'components/VideoRecorder';

import {Context} from 'store';
import styles from './form-styles';
import {
  RED,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESC_LENGTH,
  MAX_DESC_LENGTH,
} from 'globals/constants';
import {HEIGHT} from 'constants';

// TODO: to upload files
// https://stackoverflow.com/questions/29489502/how-to-upload-file-to-server-using-react-native

const initial_field_state = {
  title: '',
  description: '',
  video: null,
  images: [],
};

export default function VideoForm(props) {
  const {handlers} = React.useContext(Context);
  const [fields, setField] = React.useState(initial_field_state);
  const [dialog, setDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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

  function handleVideo(uri) {
    setField({...fields, video: uri});
    setDialog(false);
  }

  function submitComplaint() {
    setLoading(true);
    let ok = true;
    Object.keys(fields).forEach((k) => {
      if (k === 'images') {
        return;
      } else {
        if (!fields[k]) {
          ok = false;
        }
        if (
          k === 'title' &&
          fields[k].length > MIN_TITLE_LENGTH &&
          fields[k].length < MAX_TITLE_LENGTH
        ) {
          ok = false;
        }
        if (
          k === 'description' &&
          fields[k].length > MIN_DESC_LENGTH &&
          fields[k].length < MAX_DESC_LENGTH
        ) {
          ok = false;
        }
      }
    });
    if (ok) {
      handlers.createComplaint({...fields, type: 'video'}, () => {
        setLoading(false);
        handlers.getUserComplaints();
        props.navigation.goBack();
      });
    } else {
      setLoading(false);
      alert('SOME FIELDS ARE INVALID!');
    }
  }

  if (dialog) {
    return (
      <VideoRecorder
        onClose={() => setDialog(false)}
        preview={Boolean(fields.video)}
        uri={fields.video}
        onFinish={handleVideo}
      />
    );
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
      <View style={styles.audioform}>
        <Portal>
          {/* <Dialog visible={dialog} onDismiss={() => setDialog(false)} /> */}
        </Portal>
        <Card style={styles.title_card}>
          <Card.Title
            title="RECORD VIDEO HERE"
            subtitle="start recording and stop"
          />
          <Card.Content>
            <Button
              color={RED}
              onPress={() => setDialog(true)}
              icon={fields.video ? 'play' : 'record'}
              styles={styles.record_btn}>
              {fields.video ? 'PREVIEW' : 'RECORD'}
            </Button>
          </Card.Content>
          <Card.Content style={styles.field_container}>
            <TextInput
              onChangeText={(v) => updateField('title', v)}
              label="TITLE"
              placeholder="YOUR COMPLAINT REGARDING"
            />
            <HelperText>
              {fields.title.length} / {MAX_TITLE_LENGTH}
            </HelperText>
          </Card.Content>
          <Card.Content style={styles.field_container}>
            <TextInput
              label="DESCRIPTION"
              onChangeText={(v) => updateField('description', v)}
              multiline
              numberOfLines={4}
              placeholder="SOME MORE INPUTS ON YOUR COMPLAINT"
            />
            <HelperText>
              {fields.description.length} / {MAX_DESC_LENGTH}
            </HelperText>
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
            <Button
              onPress={handleImageSelect}
              disabled={fields.images.length === 4}>
              ADD IMAGES
            </Button>
          </Card.Content>
          <Card.Actions>
            <Button onPress={submitComplaint} disabled={loading} icon="check">
              SUBMIT
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </>
  );
}
