import React from 'react';
import {View, Text, Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Paragraph, Colors} from 'react-native-paper';
import moment from 'moment';

import {Context} from 'store';
import { GREEN } from 'globals/constants';

export function UserMeeting() {
  const [meetings, setMeetings] = React.useState({});
  const {handlers} = React.useContext(Context);

  React.useEffect(() => {
    handlers.getMeeting(({meetings: data, durations}) => {
      const trans_data = {};
      data.forEach((m) => {
        const dt = moment(m.scheduled_on).format('YYYY-MM-DD');
        if (trans_data[dt]) {
          trans_data[dt].push(m);
        } else {
          trans_data[dt] = [m];
        }
      });
      setMeetings(trans_data);
    });
  }, []);

  return (
    <Agenda
      items={meetings}
      theme={
       {
       agendaTodayColor:GREEN,
        }
      }
      renderItem={(meeting) => {
        return (
            <View style={{paddingRight: 10, paddingVertical: 10}}>
            <Card>
              <Card.Content>
                <Paragraph >{meeting.title}</Paragraph>
                <Paragraph style={{color: Colors.grey600}}>
                  {meeting.purpose}
                </Paragraph>
              </Card.Content>
              <Card.Content style={{marginVertical: 10}}>
                <Paragraph>👤 {meeting.name}</Paragraph>
                <Paragraph>
                  🗃 {meeting.mobile} / {meeting.email}
                </Paragraph>
                <Paragraph>
                  📅 {moment(meeting?.scheduled_on).format('DD-MM, YYYY')} / ⌚{' '}
                  {moment(meeting?.scheduled_on).format('HH:mm')} -{' '}
                  {moment(meeting?.scheduled_on)
                    .add(meeting?.duration, 'minutes')
                    .format('HH:mm')}
                </Paragraph>
              </Card.Content>
            </Card>
            </View>
        );
      }}
      renderEmptyDate={() => {
        return (
          <View>
            <Text>This is empty date!</Text>
          </View>
        );
      }}
    />
  );
}
