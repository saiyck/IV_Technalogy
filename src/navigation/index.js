import React from 'react';
import {Linking, StatusBar,Image, View} from 'react-native';
import {Colors} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import GeoLocation from '@react-native-community/geolocation';
import io from 'socket.io-client';
import {Icon} from 'react-native-vector-icons/MaterialIcons';

import {Context} from 'store';
import Login from 'screens/Login';
import Profile, {Requests, Location,UpdateKyc} from 'screens/Profile';
import Meeting, {
  MeetingForm,
  SingleMeeting,
  UserMeeting,
  SlotForm,
} from 'screens/Meeting';
import Complaint, {
  SingleComplaint,
  UserComplaint,
  ComplaintForm,
} from 'screens/Complaint';
import News, {SingleNews, UserNews, NewsForm} from 'screens/News';
import routes from './routes';
import {BLUE, GREEN, ORANGE, RED, socket_endpoint, WHITE, YELLOW} from 'globals/constants';

const TabNavigator = createMaterialBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ComplaintStack = createStackNavigator();
const MeetingStack = createStackNavigator();
const NewsStack = createSharedElementStackNavigator();

const options = {
  tab_navigator: {
    [routes.login]: {
      tabBarLabel: 'More',
      tabBarIcon: 'menu',
    },
    [routes.news]: {
      tabBarLabel: 'News',
      tabBarIcon: 'newspaper',
    },
    [routes.meeting]: {
      tabBarLabel: 'Meeting',
      tabBarIcon: 'calendar',
    },
    [routes.complaint]: {
      tabBarLabel: 'Complaint',
      tabBarIcon: 'check',
    },
  },
};

const NewsApp = (props) => {
  React.useEffect(() => {
    if (props.route.params) {
      props.navigation.navigate(routes.single_news, props.route.params);
    }
  }, [props.route.params]);

  return (
    <>
      <NewsStack.Navigator
        initialRouteName={routes.news}
        screenOptions={{
          headerTitle: 'NEWS',
          headerStyle: {backgroundColor: RED},
          headerTitleStyle: {color: Colors.white},
          headerTintColor: Colors.white,
          headerRight:()=><View style={{flexDirection:'row'}}>
          
          </View>
        }  
      }>
        <NewsStack.Screen name={routes.news} component={News} />
        <NewsStack.Screen
          name={routes.single_news}
          initialParams={props.route.params}
          component={SingleNews}
        />
      </NewsStack.Navigator>
    </>
  );
};

const MeetingApp = (props) => {
  return (
    <>
      <MeetingStack.Navigator
        initialRouteName={routes.meeting}
        screenOptions={{
          headerTitle: 'MEETING',
          headerStyle: {backgroundColor: ORANGE},
          headerTitleStyle: {color: Colors.white},
          headerTintColor: Colors.white,
        }}>
        <MeetingStack.Screen name={routes.meeting} component={Meeting} />
        <MeetingStack.Screen
          name={routes.create_meeting}
          initialParams={{type: 'new'}}
          options={{headerTitle: 'CREATE MEETING'}}
          component={MeetingForm}
        />
        <MeetingStack.Screen
          name={routes.update_meeting}
          initialParams={{type: 'edit'}}
          options={{headerTitle: 'UPDATE MEETING'}}
          component={MeetingForm}
        />
        <MeetingStack.Screen
          name={routes.single_meeting}
          component={SingleMeeting}
        />
      </MeetingStack.Navigator>
    </>
  );
};

const ComplaintApp = (props) => {
  return (
    <>
      <ComplaintStack.Navigator
        initialRouteName={routes.complaint}
        screenOptions={{
          headerTitle: 'COMPLAINTS',
          headerStyle: {backgroundColor: GREEN},
          headerTitleStyle: {color: Colors.white},
          headerTintColor: Colors.white,
        }}>
        <ComplaintStack.Screen name={routes.complaint} component={Complaint} />
        <ComplaintStack.Screen
          name={routes.single_complaint}
          component={SingleComplaint}
        />
        <ComplaintStack.Screen
          name={routes.create_complaint}
          component={ComplaintForm}
        />
      </ComplaintStack.Navigator>
    </>
  );
};

const ProfileApp = (props) => {
  const {state, handlers} = React.useContext(Context);

  React.useEffect(() => {
    messaging().subscribeToTopic('news');
    if (state.user.token) {
      messaging()
        .getToken()
        .then((token) => {
          handlers.updateLocalData({notification_id: token});
          return handlers.updateUser(state.user.data.id, {
            notification_id: token,
          });
        });

      props.navigation.reset({
        index: 0,
        routes: [{name: routes.profile}],
      });

      return messaging().onTokenRefresh((token) => {
        handlers.updateLocalData({notification_id: token});
        return handlers.updateUser(state.user.data.id, {
          notification_id: token,
        });
      });
    }
  }, [state.user.token]);

  return (
    <ProfileStack.Navigator
      initialRouteName={state.user.token ? routes.profile : routes.login}
      screenOptions={{
        
        headerStyle: {backgroundColor: BLUE},
        headerTitleStyle: {color: Colors.white},
        headerTintColor: Colors.white,
       
      }}>
      <ProfileStack.Screen
        name={routes.single_complaint}
        component={SingleComplaint}
      />
      <ProfileStack.Screen name={routes.login} component={Login} />
      <ProfileStack.Screen name={routes.profile} component={Profile} />
      <ProfileStack.Screen
        name={routes.user_complaints}
        component={UserComplaint}
      />
      <ProfileStack.Screen
        name={routes.updatekyc}
        component={UpdateKyc}
      />
      <ProfileStack.Screen name={routes.slots} component={SlotForm} />
      <ProfileStack.Screen
        name={routes.user_meetings}
        component={UserMeeting}
      />
      <ProfileStack.Screen
       name={routes.user_news} component={UserNews} 
       />
      <ProfileStack.Screen name={routes.requests} component={Requests} />
      <ProfileStack.Screen name={routes.create_news} component={NewsForm} />
      <ProfileStack.Screen name={routes.location} component={Location} />
    </ProfileStack.Navigator>
  );
};

const RootApp = ({nav_ref}) => {
  const {tab_navigator} = options;
  const {handlers, state} = React.useContext(Context);
  const [color, setActiveColor] = React.useState(state.user.token ? RED : BLUE);
  const socket = React.useRef();
  const interval = React.useRef();

  if (!interval.current && socket?.current?.on) {
    socket.current.on('connect', () => {
      interval.current = setInterval(async () => {
        if (state.user.token && socket.current.connected) {
          GeoLocation.getCurrentPosition(
            ({coords}) => {
              socket.current.emit('location', {
                location: coords,
                user: state.user?.data,
              });
            },
            () => {},
            {
              timeout: 5000,
              maximumAge: 0,
              enableHighAccuracy: true,
            },
          );
        }
      }, 5000);
    });
  }

  React.useEffect(() => {
    if (!socket?.current?.connected) {
      socket.current = io(socket_endpoint, {reconnection: true});
    }

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  React.useEffect(() => {
    Linking.getInitialURL()
      .then((url) => {
        if (url?.split) {
          const news_id = url.split('/')[5];
          if (news_id) {
            handlers.getNews((news_list) => {
              const news = news_list.find((x) => x.id === news_id);
              if (news) {
                nav_ref.current?.navigate(routes.single_news, news);
              } else {
                alert('NEWS NOT FOUND!');
              }
            });
          }
        }
      })
      .catch((err) => console.error('An error occurred', err));
    Linking.addEventListener('url', ({url}) => {
      if (url?.split) {
        const news_id = url.split('/')[5];
        if (news_id) {
          handlers.getNews((news_list) => {
            const news = news_list.find((x) => x.id === news_id);
            if (news) {
              nav_ref.current?.navigate(routes.single_news, news);
            } else {
              alert('NEWS NOT FOUND!');
            }
          });
        }
      }
    });

    messaging().onNotificationOpenedApp((message) => {
      console.info('REMOTE MESSAGE', message);
    });

    messaging()
      .getInitialNotification()
      .then((message) => {
        if (message) {
          const news_id = message.data.news_id;
          if (news_id) {
            handlers.getNews((news_list) => {
              const news = news_list.find((x) => x.id === news_id);
              if (news) {
                nav_ref.current?.navigate(routes.news, news);
              } else {
                alert('NEWS NOT FOUND!');
              }
            });
          }
        }
      });

    messaging().onMessage((message) => {
      console.info('MESSAGE', message);
    });
  }, []);

  React.useEffect(() => {
    if (state.user.token) {
      setActiveColor(RED);
      nav_ref.current?.reset({
        index: 0,
        routes: [{name: routes.news}],
      });
    }
  }, [state.user.token]);

  return (
    <>
      <StatusBar backgroundColor={color} />
      <TabNavigator.Navigator
        headerMode="none"
        barStyle={{backgroundColor: color}}
        activeColor={WHITE}
        inactiveColor={WHITE}
        initialRouteName={state.user.token ? routes.news : routes.login}>
        <TabNavigator.Screen
          listeners={{tabPress: () => setActiveColor(RED)}}
          options={tab_navigator[routes.news]}
          name={routes.news}
          component={NewsApp}
        />
        <TabNavigator.Screen
          listeners={{tabPress: () => setActiveColor(ORANGE)}}
          options={tab_navigator[routes.meeting]}
          name={routes.meeting}
          component={MeetingApp}
        />
        <TabNavigator.Screen
          listeners={{tabPress: () => setActiveColor(GREEN)}}
          options={tab_navigator[routes.complaint]}
          name={routes.complaint}
          component={ComplaintApp}
        />
        <TabNavigator.Screen
          listeners={{tabPress: () => setActiveColor(BLUE)}}
          options={tab_navigator[routes.login]}
          name={routes.login}
          component={ProfileApp}
        />
      </TabNavigator.Navigator>
    </>
  );
};

export default RootApp;
