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


const UserRequests = (props) => {
    const {state, handlers} = React.useContext(Context);
    const [dialog, setDialog] = React.useState(false);
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
   
    function handleOpen(user){
     props.navigation.navigate(routes.user_profile,user);
    }
    function handleSelect(type, request) {
      switch (type) {
        case 'view':
          
          break;  
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
              index={i}
              onSelect={handleSelect}
              onOpen={()=>handleOpen(u)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };
  export default UserRequests;