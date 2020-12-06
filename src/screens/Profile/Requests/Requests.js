import React from 'react';
import {View, Dimensions, RefreshControl, ScrollView,Text} from 'react-native';
import {TabView, SceneMap,TabBar} from 'react-native-tab-view';
import {Dialog, Portal} from 'react-native-paper';
import {Context} from 'store';
import UserCard, {RequestCard} from 'components/UserCard';
import styles from './request-style';
import { GREEN } from 'globals/constants';
import routes from 'navigation/routes';
import UserProfile from './UserProfile';
import UserRequests from './UserRequests';
import Users from './Users';


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

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: GREEN }}
    />
  );


  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
