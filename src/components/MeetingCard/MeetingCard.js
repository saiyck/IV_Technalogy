import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
// import {SharedElement} from 'react-native-shared-element';
import {Card, Button, Paragraph} from 'react-native-paper';
import moment from 'moment';

import {BLUE, RED} from 'globals/constants';
import styles from './meetingcard-styles';

function MeetingCard(props) {
  return (
    <TouchableOpacity onPress={() => props.onSelect('view', props.id)}>
      <Card style={styles.container}>
        <Card.Title
          title={props.title}
          subtitle={
            props.name +
            ' / ' +
            moment(props.scheduled_on).format('DD - MM, YYYY')
          }
        />
        <Card.Content>
          <Paragraph>{props.purpose}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            color={RED}
            onPress={() => props.onSelect('delete', props.id)}>
            CANCEL
          </Button>
          {/* <Button
            icon="pencil"
            color="#1976d2"
            onPress={() => props.onSelect('edit', props.index)}
          /> */}
          <Button
            icon="eye"
            color={BLUE}
            onPress={() => props.onSelect('view', props.id)}
          />
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

// MeetingCard.sharedElements = function (navigation, otherRoute) {
//   const index = otherRoute.params.index;
//   return [`image-${index}`];
// };

MeetingCard.propTypes = {
  onSelect: PropTypes.func,
  index: PropTypes.number,
};

export default MeetingCard;
