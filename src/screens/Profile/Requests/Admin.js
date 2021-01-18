import React from 'react';
import {View, Dimensions, RefreshControl, ScrollView,Text} from 'react-native';
import {TabView, SceneMap,TabBar} from 'react-native-tab-view';
import {Dialog, Portal} from 'react-native-paper';
import {Context} from 'store';
import UserCard, {RequestCard} from 'components/UserCard';
import styles from './request-style';
import { GREEN } from 'globals/constants';
import routes from 'navigation/routes';
import AdminUser from './AdminUser';
import DesignatedUser from './DesignatedUser';


const initialLayout = {width: Dimensions.get('window').width};

export default function Admin() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'designated', title: 'DESIGNATED'},
    {key: 'admin', title: 'ADMIN'},
  ]);

  const renderScene = SceneMap({
    admin: AdminUser,
    designated: DesignatedUser,
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
