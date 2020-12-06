import React from 'react';
import {ScrollView, View, RefreshControl, Text} from 'react-native';
import {FAB, Button, Card} from 'react-native-paper';

import {Context} from 'store';
import ComplaintCard from 'components/ComplaintCard';
import routes from 'navigation/routes';

import styles from './complaint-style';
import Loading from 'components/Loading';
import { BLACK, BLUE, GREEN, YELLOW } from 'globals/constants';

export default function Complaint(props) {
  const {state, handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (state.user.token) {
      getComplaints();
    }
  }, []);

  function getComplaints() {
    setLoading(true);
    handlers.getUserComplaints(() => {
      setLoading(false);
    });
  }

  function handleSelect(type, complaint) {
    switch (type) {
      case 'view':
        props.navigation.navigate(routes.single_complaint, complaint);
        break;
      default:
        props.navigation.navigate(routes.create_complaint, {
          type,
        });
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
    <View style={styles.complaint_container}>
      {loading && <Loading />}
      <View style={styles.complaint_actions}>
        <Button
          icon="file-music-outline"
          color={GREEN}
          onPress={() => handleSelect('audio')}
          mode="contained">
          AUDIO
        </Button>
        <Button
          icon="file-video-outline"
          color={GREEN}
          onPress={() => handleSelect('video')}
          mode="contained">
          VIDEO
        </Button>
        <Button
          color={GREEN}
          icon="file-word-outline"
          onPress={() => handleSelect('text')}
          mode="contained">
          TEXT
        </Button>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getComplaints} />
        }>
        {state.complaints.map((complaint, i) => (
          <ComplaintCard
            onSelect={handleSelect}
            key={`${JSON.stringify(complaint)}-${i}`}
            index={i}
            complaint={complaint}
          />
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
      {/* <FAB.Group
        open={open}
        color="white"
        fabStyle={styles.fab}
        icon={open ? 'minus' : 'plus'}
        actions={[
          {
            icon: 'file-music-outline',
            onPress: () => handleSelect('audio'),
          },
          {
            icon: 'file-video-outline',
            onPress: () => handleSelect('video'),
          },
          {
            icon: 'file-word-outline',
            onPress: () => handleSelect('text'),
          },
        ]}
        onStateChange={() => setOpen(!open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      /> */}
      {/* <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => handleSelect('create')}
      /> */}
    </View>
  );
}
