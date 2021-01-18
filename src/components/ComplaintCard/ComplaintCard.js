import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
// import {SharedElement} from 'react-native-shared-element';
import {Card, IconButton} from 'react-native-paper';

import styles from './complaintcard-styles';

function ComplaintCard(props) {
  const {complaint} = props;
  let type;

  switch (complaint.type) {
    case 'audio':
      type = 'music-circle';
      break;
    case 'video':
      type = 'video';
      break;
    default:
      type = 'note-text';
  }

  return (
    <TouchableOpacity onPress={() => props.onSelect('view', complaint)}>
      <Card style={styles.container}>
        <Card.Title
          title={complaint.title}
          titleNumberOfLines={2}
          titleStyle={{fontStyle:'normal',fontWeight:'500',fontSize:16}}
          subtitle={complaint.user_name + ' / ' + complaint.description}
          subtitleNumberOfLines={3}
        />
        <IconButton
          style={styles.file_type}
          icon={type}
          size={25}
          color="#9E9E9E"
          onPress={() => props.onSelect('view', complaint)}
        />
      </Card>
    </TouchableOpacity>
  );
}

// ComplaintCard.sharedElements = function (navigation, otherRoute) {
//   const index = otherRoute.params.index;
//   return [`image-${index}`];
// };

ComplaintCard.propTypes = {
  onSelect: PropTypes.func,
  index: PropTypes.number,
};

export default ComplaintCard;
