import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Alert} from 'react-native';
// import {SharedElement} from 'react-native-shared-element';
import {Card, Paragraph, Text, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import {Context} from 'store';
import styles from './singlemeeting-styles';
import {RED} from 'globals/constants';

export default function SingleMeeting(props) {
  const {state, handlers} = React.useContext(Context);
  let index = props.route.params.index;

  const meeting = state.meetings.find((x) => x.id === index)
    ? state.meetings.find((x) => x.id === index)
    : state.user.meetings.find((x) => x.id === index);
  function cancelMeeting() {
    Alert.alert('DELETE', 'CONFIRM CANCEL MEETING?', [
      {
        text: 'YES',
        onPress: () =>
          handlers.deleteMeeting(index, () => {
            handlers.getUserMeeting(() => true);
            props.navigation.goBack();
          }),
        style: 'destructive',
      },
      {
        text: 'CANCEL',
        style: 'cancel',
      },
    ]);
  }

  if (!meeting) {
    return <View />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{meeting?.title}</Text>
      <View style={styles.meta}>
        <Text style={styles.meta_title}>SCHEDULE DATE</Text>
        <Card>
          <Card.Content style={styles.schedule}>
            <Icon name="calendar" style={styles.schedule_icon} />
            <Text style={styles.schedule_text}>
              {moment(meeting?.scheduled_on).format('DD - MM, YYYY')}
            </Text>
            <Text style={styles.schedule_text}>
              {moment(meeting?.scheduled_on).format('HH:mm')}
            </Text>
          </Card.Content>
          <Card.Content>
            <Text style={{marginVertical: 10}}>
              <Icon name="clock-o" style={styles.schedule_icon} />{' '}
              {meeting?.duration} minutes{' '}
            </Text>
          </Card.Content>
          <Card.Actions style={{justifyContent: 'flex-end'}}>
            <Button color={RED} onPress={cancelMeeting}>
              CANCEL
            </Button>
          </Card.Actions>
        </Card>
      </View>

      <View style={styles.meta}>
        <Text style={styles.meta_title}>DETAILS</Text>
        <Card>
          <Card.Content style={{marginBottom: 20}}>
            <Paragraph style={{fontWeight: '700'}}>DESCRIPTION</Paragraph>
            <Paragraph>{meeting.purpose}</Paragraph>
          </Card.Content>
          <Card.Content>
            <Paragraph style={{fontWeight: '700', marginTop: 10}}>
              REQUESTOR DETAILS
            </Paragraph>
            <Paragraph>{meeting.name}</Paragraph>
            <Paragraph>
              {meeting.mobile} / {meeting.email}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

// SingleMeeting.sharedElements = (route, ...others) => {
//   const index = route.params.index;
//   return [`image-${index}`];
// };

SingleMeeting.propTypes = {
  handleSelect: PropTypes.func,
  index: PropTypes.number,
};
