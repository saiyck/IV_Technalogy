import React from 'react';
import {View,ScrollView,Image,TouchableHighlight} from 'react-native';
import {Card, Button, TextInput,Modal,Portal} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

import {Context} from 'store';
import Loading from 'components/Loading';
import styles from './news-style';
import { GREEN ,WHITE,RED} from 'globals/constants';
import {HEIGHT} from 'constants';

const initial_field_state = {
  title: null,
  content: null,
  images: [],
};

export function NewsForm(props) {
  const [fields, setField] = React.useState(initial_field_state);
  const {handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  function updateField(k, v) {
    setField({...fields, [k]: v});
  }

  function handleImageSelect() {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      maxFiles: 1,
    }).then((images) => {
      updateField('images', images);
    });
  }

  function createNews() {
    setLoading(true);
    let is_valid = true;
    Object.keys(fields).map((k) => {
      if (!fields[k] && is_valid) {
        alert(k);
        is_valid = false;
      }
      if (k === 'images' && !fields[k].length && is_valid) {
        is_valid = false;
      }
      if (k === 'title' && fields[k].length < 5 && fields[k] > 50) {
        is_valid = false;
      }
      if (k === 'content' && fields[k].length < 5 && fields[k] > 500) {
        is_valid = false;
      }
    });

    if (is_valid) {
      const {images, ...rest} = fields;
      handlers.createNews(
        {
          ...rest,
          image: fields.images[0].data,
          mime: fields.images[0].mime,
        },
        (created) => {
          setLoading(false);
          if (created) {
            setField(initial_field_state);
            props.navigation.goBack();
            handlers.getNews();
          }
        },
      );
    } else {
      setLoading(false);
      alert('SOME FIELDS ARE EMPTY!');
    }
  }

  return (
    
    <ScrollView>
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
    <View style={styles.newsform}>
      {loading && <Loading />}
      <Card>
        <Card.Title
        title="CREATE NEWS"
        titleStyle={{color:GREEN}}
        />
        <Card.Content style={styles.field_container}>
          <TextInput
            onChangeText={(v) => updateField('title', v)}
            value={fields.title}
            label="TITLE"
            placeholder="YOUR NEWS TITLE"
            theme={{
              colors:{
                primary:GREEN,
                placeholder:GREEN
              }
            }}
          />
        </Card.Content>
        <Card.Content style={styles.field_container}>
          <TextInput
            label="DESCRIPTION"
            onChangeText={(v) => updateField('content', v)}
            value={fields.content}
            multiline
            numberOfLines={4}
            placeholder="CONTENT OF YOUR NEWS"
            theme={{
              colors:{
                primary:GREEN,
                placeholder:GREEN
              }
            }}
          />
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
                color={GREEN}
                onPress={handleImageSelect}
                disabled={fields.images.length === 1}>
                ADD IMAGE
              </Button>
              </View>
        </Card.Content>
        <Card.Actions>
        <Button
                style={styles.send}
                onPress={createNews}
                color={WHITE}
                icon="check">
                SUBMIT
              </Button> 
        </Card.Actions>
      </Card>
    </View>
    </ScrollView>
  );
}
