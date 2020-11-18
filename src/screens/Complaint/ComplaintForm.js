import React from 'react';
import {View, Text} from 'react-native';

import TextForm from './shared/TextForm';
import AudioForm from './shared/AudioForm';
import VideoForm from './shared/VideoForm';

export function ComplaintForm(props) {
  const [more, setMore] = React.useState(false);

  if (more) {
    return (
      <View>
        <Text>MORE</Text>
      </View>
    );
  }

  let content;

  switch (props.route.params.type) {
    case 'audio':
      content = <AudioForm navigation={props.navigation} />;
      break;
    case 'video':
      content = <VideoForm navigation={props.navigation} />;
      break;
    default:
      content = <TextForm navigation={props.navigation} />;
  }

  return <View>{content}</View>;
}
