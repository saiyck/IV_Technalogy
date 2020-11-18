import React from 'react';
import {View, Dimensions, RefreshControl, ScrollView} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {Context} from 'store';
import UserCard, {RequestCard} from 'components/UserCard';
import styles from './request-style';

const Users = () => {
  const {state, handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    setLoading(true);
    handlers.getUsersRequests(() => {
      setLoading(false);
    });
  }

  function handleSelect(type, user) {
    handlers.updateUser(user.id, {type}, () => {
      getUsers();
    });
  }

  return (
    <View style={styles.scene}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getUsers} />
        }>
        {state.user.users.map((r) => (
          <RequestCard {...r} onSelect={handleSelect} />
        ))}
      </ScrollView>
    </View>
  );
};

const UserRequests = () => {
  const {state, handlers} = React.useContext(Context);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    setLoading(true);
    handlers.getUsersRequests(() => {
      setLoading(false);
    });
  }

  function handleSelect(type, request) {
    switch (type) {
      case 'accept':
        console.info('REQUEST', request);
        handlers.approveRequest(request.requester_id, getUsers);
        break;
      case 'reject':
        handlers.rejectRequest(request.requester_id, getUsers);
        break;
    }
  }

  return (
    <View style={styles.scene}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getUsers} />
        }>
        {state.user.requests.map((u, i) => (
          <UserCard
            key={`${JSON.stringify(u)}-${i}`}
            {...u}
            onSelect={handleSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

export default function Requests() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'user', title: 'USERS'},
    {key: 'requests', title: 'REQUESTS'},
  ]);

  const renderScene = SceneMap({
    requests: UserRequests,
    user: Users,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
