import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Alert, Image, TouchableOpacity} from 'react-native';
// import {SharedElement} from 'react-native-shared-element';
import {
  Card,
  Paragraph,
  Text,
  IconButton,
  Portal,
  Modal,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sound from 'react-native-sound';
import Video from 'react-native-video';

import styles from './singlecomplaint-styles';
import {base_url, RED} from 'globals/constants';
import {HEIGHT, WIDTH} from 'constants';

// const audio_link =
//   'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';
// const video_link = 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4';

export default function SingleComplaint(props) {
  const complaint = props.route.params;
  const complaint_url = `${base_url}/public/complaint/${complaint.user_id}/${complaint.id}`;
  const [view, setImageView] = React.useState(null);
  const [vid_loading, setVideoLoading] = React.useState(false);
  const [controls, setControls] = React.useState({
    loading: true,
    play: false,
    audio: null,
  });
  var sound = React.useRef();

  const type = complaint.type;

  React.useEffect(() => {
    if (type === 'audio') {
      const audio_link = complaint_url + '/audio.wav';
      sound.current = new Sound(audio_link, undefined, (err) => {
        if (err) {
          Alert.alert('ERROR', 'Error playing network');
        } else {
          alert('AUDIO FILE LOADED!');
          setControls({...controls, loading: false, audio: sound.current});
        }
      });
    }

    return () => {
      if (sound.current && sound.current?.stop) {
        sound.current.stop();
      }
    };
  }, []);

  let content, icon;

  switch (type) {
    case 'audio':
      icon = 'music';
      content = (
        <>
          <Card.Content style={styles.meta}>
            {!controls.loading ? (
              <Text>PLAYING SOUND FROM NETWORK</Text>
            ) : (
              <Text>LOADING THE FILE...</Text>
            )}
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon="play"
              disabled={controls.play || controls.loading}
              onPress={() => {
                controls.audio.play();
                setControls({...controls, play: true});
              }}
            />
            <IconButton
              icon="pause"
              disabled={!controls.play || controls.loading}
              onPress={() => {
                controls.audio.pause();
                setControls({...controls, play: false});
              }}
            />
            <IconButton
              icon="stop"
              disabled={controls.loading}
              onPress={() => {
                controls.audio.stop();
                setControls({...controls, play: false});
              }}
            />
          </Card.Actions>
        </>
      );
      break;
    case 'video':
      icon = 'video';
      const video_link = complaint_url + '/video.mp4';
      content = (
        <>
          <Card.Content
            style={[styles.meta, styles.content, {position: 'relative'}]}>
            {vid_loading && (
              <View style={styles.loading}>
                <Image
                  style={{width: WIDTH / 2}}
                  source={require('../../assets/loading.gif')}
                />
              </View>
            )}
            <Video
              repeat
              resizeMode="contain"
              playInBackground={false}
              onLoadStart={() => setVideoLoading(true)}
              onLoad={() => setVideoLoading(false)}
              style={styles.video}
              source={{uri: video_link}}
              paused={!controls.play}
            />
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon="play"
              disabled={controls.play || vid_loading}
              onPress={() => {
                setControls({...controls, play: true});
              }}
            />
            <IconButton
              icon="pause"
              disabled={!controls.play || vid_loading}
              onPress={() => {
                setControls({...controls, play: false});
              }}
            />
          </Card.Actions>
        </>
      );
      break;
    case 'text':
      icon = 'text';
      content = <View />;
      break;
  }

  return (
    <>
      <Portal>
        <Modal visible={Boolean(view)} onDismiss={() => setImageView(null)}>
          <Image
            source={{uri: view}}
            resizeMode="contain"
            style={{height: HEIGHT - 200}}
          />
          <Button
            mode="contained"
            icon="close"
            color={RED}
            onPress={() => setImageView(null)}>
            CLOSE
          </Button>
        </Modal>
      </Portal>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{complaint.title}</Text>
          {type !== 'text' && (
            <View style={styles.meta}>
              <Text style={styles.meta_title}>
                <Icon name={icon} style={styles.schedule_icon} />
                <Text> FILE</Text>
              </Text>
              <Card>{content}</Card>
            </View>
          )}

          <View style={styles.meta}>
            <Card>
              <Card.Content style={{marginBottom: 20}}>
                <Text style={styles.meta_title}>USER</Text>
                <Text style={styles.description}>{complaint?.user_name}</Text>
                <Text style={styles.description}>
                  {complaint?.email} / {complaint?.mobile}
                </Text>
              </Card.Content>
              <Card.Content>
                <Text style={styles.meta_title}>DESCRIPTION</Text>
                <Paragraph>{complaint.description}</Paragraph>
              </Card.Content>
            </Card>
          </View>
          {type === 'audio' && (
            <View style={styles.meta}>
              <Text style={styles.meta_title}>TRANSLATED TEXT</Text>
              <Card>
                <Card.Content>
                  {complaint.process_status === 'processed' ? (
                    <>
                      <Paragraph style={{marginBottom: 10}}>
                        {complaint.speech_text
                          ? complaint.speech_text
                          : 'NO SPOKEN TEXT AVAILABLE'}
                      </Paragraph>
                      <Paragraph>
                        {complaint.translated_text
                          ? complaint.translated_text
                          : 'NO PROCESSED TEXT AVAILABLE'}
                      </Paragraph>
                    </>
                  ) : (
                    <Paragraph style={{textTransform: 'uppercase'}}>
                      {complaint.process_status}
                    </Paragraph>
                  )}
                </Card.Content>
              </Card>
            </View>
          )}
          {Boolean(
            complaint.files.filter((x) => x.includes('image'))?.length,
          ) && (
            <View style={styles.meta}>
              <Text style={styles.meta_title}>OTHER MEDIA</Text>
              <Card>
                <Card.Content style={styles.gallery}>
                  {complaint.files &&
                    complaint.files
                      .filter((x) => x.includes('image'))
                      .map((img) => (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              setImageView(complaint_url + '/' + img)
                            }>
                            <Image
                              style={styles.gallery_image}
                              resizeMode="cover"
                              key={img}
                              source={{uri: complaint_url + '/' + img}}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                </Card.Content>
              </Card>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

// SingleMeeting.sharedElements = (route, ...others) => {
//   const index = route.params.index;
//   return [`image-${index}`];
// };

SingleComplaint.propTypes = {
  handleSelect: PropTypes.func,
  index: PropTypes.number,
};
