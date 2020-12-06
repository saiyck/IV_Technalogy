import React from 'react';
import {Image, ScrollView,View} from 'react-native';
import {
  Card,
  Button,
  TextInput,
  Portal,
  Modal,
  HelperText,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

import {Context} from 'store';
import Loading from 'components/Loading';
import styles from './form-styles';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESC_LENGTH,
  MAX_DESC_LENGTH,
  RED,
  GREEN,
  WHITE
} from 'globals/constants';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {HEIGHT} from 'constants';
import {title} from 'process';

const initial_field_state = {
  title: '',
  description: '',
  images: [],
};

export default function TextForm(props) {
  const {handlers} = React.useContext(Context);
  const [fields, setField] = React.useState(initial_field_state);
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
      console.info('IMAGES', images);
      updateField('images', images);
    });
  }

  function submitComplaint() {
    setLoading(true);
    let ok = true;
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
      }
      if (
        k === 'description' &&
        (fields[k].length < MIN_DESC_LENGTH ||
          fields[k].length > MAX_DESC_LENGTH)
      ) {
        ok = false;
      }
    });
    if (ok) {
      handlers.createComplaint({...fields, type: 'text'}, () => {
        setLoading(false);
        handlers.getUserComplaints();
        props.navigation.goBack();
      });
    } else {
      setLoading(false);
      alert('SOME FIELDS ARE INVALID!');
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
      <ScrollView style={styles.audioform}>
        {loading && <Loading />}
        <Card>
          <Card.Title
            title="TEXT COMPLAINT"
            titleStyle={{color:GREEN}}
            subtitle="complaint details here"
            subtitleStyle={{color:GREEN}}
          />
          <Card.Content style={styles.field_container}>
            <TextInput
              style={{color:GREEN}}
              onChangeText={(v) => updateField('title', v)}
              label="TITLE"
              placeholder="YOUR COMPLAINT REGARDING"
              theme={{
                colors:{
                  primary:GREEN,
                  placeholder:GREEN
                }
              }}
            />
            <HelperText>
              {fields.title.length} / {MAX_TITLE_LENGTH}
            </HelperText>
          </Card.Content>
          <Card.Content style={styles.field_container}>
            <TextInput
              style={{color:GREEN}}
              label="DESCRIPTION"
              onChangeText={(v) => updateField('description', v)}
              multiline
              numberOfLines={4}
              placeholder="SOME MORE INPUTS ON YOUR COMPLAINT"
              theme={{
                colors:{
                  primary:GREEN,
                  placeholder:GREEN
                }
              }}
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
         < View style={styles.imageUploader}>
              <Image source={require('./assets/imageUploader.png')}
              style={{width:40,height:40,marginLeft:60}}/>
              <Button
                color={GREEN}
                onPress={handleImageSelect}
                disabled={fields.images.length === 4}>
                ADD IMAGES
              </Button>
              </View>
          </Card.Content>
          <Card.Actions>
          <Button
                style={styles.send}
                onPress={submitComplaint}
                color={WHITE}
                disabled={loading}
                icon="check">
                SUBMIT
              </Button> 
          </Card.Actions>
        </Card>
      </ScrollView>
    </>
  );
}
