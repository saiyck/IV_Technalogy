import React from 'react';
import {ScrollView, View, Alert, RefreshControl, Text} from 'react-native';
import {FAB, Button, Card ,IconButton} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {Context} from 'store';
import MeetingCard from 'components/MeetingCard';
import Loading from 'components/Loading';
import routes from 'navigation/routes';

import styles from './meeting-style';
import { BLACK, GREEN } from 'globals/constants';

function Meeting(props) {
  const {state, handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (state.user.token) {
      handlers.getUserMeeting(() => {
        setLoading(false);
      });
    }
  }, []);

  function getMeetings() {
    setLoading(true);
    handlers.getUserMeeting(() => {
      setLoading(false);
    });
  }

  function handleSelect(type, index) {
    switch (type) {
      case 'view':
        props.navigation.navigate(routes.single_meeting, {index});
        break;
      case 'edit':
        props.navigation.navigate(routes.update_meeting, {index});
        break;
      case 'delete':
        Alert.alert('DELETE', 'CONFIRM DELETE SCHEDULE?', [
          {
            text: 'DELETE',
            onPress: () => handlers.deleteMeeting(index, getMeetings),
            style: 'destructive',
          },
          {
            text: 'CANCEL',
            style: 'cancel',
          },
        ]);
        break;
      case 'create':
        props.navigation.navigate(routes.create_meeting);
    }
  }

  if (!state.user.token) {
    return (
      <View style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <Card style={styles.login_container}>
          <Card.Content>
            <Text style={{textAlign: 'center',color:BLACK}}>YOU NEED TO BE LOGGED IN</Text>
          </Card.Content>
          <Button color={GREEN} onPress={() => props.navigation.navigate(routes.login)}>
            LOGIN
          </Button>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.meeting_container}>
      {loading && <Loading />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getMeetings} />
        }>
        {state.meetings.map((meeting, i) => (
          <MeetingCard
            onSelect={handleSelect}
            key={`${JSON.stringify(meeting)}-${i}`}
            index={i}
            {...meeting}
          />
        ))}
      </ScrollView>
      <ActionButton buttonColor={GREEN} >
      <ActionButton.Item buttonColor={GREEN} title="Book Meeting" onPress={() => handleSelect('create')} >
       <Icon name="md-create" style={styles.actionButtonIcon}  />
      </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

export default Meeting;
