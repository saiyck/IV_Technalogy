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
const Users = (props) => {
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
  
    function handleOpen(user){
        props.navigation.navigate(routes.user_profile,user);
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
          {state.user.users.map((r , i)=> (
            r.type !=='casual'&&
            <RequestCard 
            key={`${JSON.stringify(r)}-${i}`}
            {...r} 
            index={i}
            onSelect={handleSelect} 
            onOpen={()=>handleOpen(r)}/>
          ))}
        </ScrollView>
      </View>
    );
  };
  export default Users;
  