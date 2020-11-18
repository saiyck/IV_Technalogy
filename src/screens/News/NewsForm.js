import React from 'react';
import {View} from 'react-native';
import {Card, Button, TextInput} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

import {Context} from 'store';
import Loading from 'components/Loading';
import styles from './news-style';

const initial_field_state = {
  title: null,
  content: null,
  images: [],
};

export function NewsForm(props) {
  const [fields, setField] = React.useState(initial_field_state);
  const {handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

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
    <View style={styles.newsform}>
      {loading && <Loading />}
      <Card>
        <Card.Content style={styles.field_container}>
          <TextInput
            onChangeText={(v) => updateField('title', v)}
            value={fields.title}
            label="TITLE"
            placeholder="YOUR NEWS TITLE"
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
          />
        </Card.Content>
        <Card.Content style={styles.field_container}>
          <Button onPress={handleImageSelect}>ADD IMAGE</Button>
        </Card.Content>
        <Card.Actions>
          <Button icon="check" disabled={loading} onPress={createNews}>
            ADD NEWS
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
