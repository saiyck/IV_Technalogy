import React from 'react';
import {View, Text, ScrollView,Image,ImageBackground} from 'react-native';
import {List, Button, Dialog, Portal} from 'react-native-paper';

import {Context} from 'store';
import {RED, GREEN, YELLOW, BLUE, ORANGE, TGREEN} from 'globals/constants';
import routes from 'navigation/routes';
import LinearGradient from 'react-native-linear-gradient'

import styles from './profile-style';
import UpdateForm from './UpdateForm';
import UpdateKyc from './UpdateKyc';

function Profile(props) {
  const {state, handlers} = React.useContext(Context);
  const [dialog, setDialog] = React.useState(false);
  const {profile, setProfile} = React.useState('https://www.oneeducation.org.uk/wp-content/uploads/2020/06/cool-profile-icons-69.png');

  function showScreen(type) {
    switch (type) {
      case 'updateKyc':
        props.navigation.navigate(routes.updatekyc);
        break;
      case 'meetings':
        props.navigation.navigate(routes.user_meetings);
        break;
      case 'slots':
        props.navigation.navigate(routes.slots);
        break;
      case 'location':
        props.navigation.navigate(routes.location);
        break;
      case 'complaints':
        props.navigation.navigate(routes.user_complaints);
        break;
      case 'user':
        props.navigation.navigate(routes.users);
        break;  
      case 'news':
        props.navigation.navigate(routes.user_news);
        break;
      case 'requests':
        props.navigation.navigate(routes.user_requests);
        break;
      case 'admin':
        props.navigation.navigate(routes.admin);
        break;
      case 'logout':
        handlers.logout(() => {
          props.navigation.reset({
            index: 0,
            routes: [{name: routes.login}],
          });
        });
        break;
      default:
        console.info('DEFAULT', type);
        return;
    }
  }

  
  function createRequest() {
    handlers.createRequest();
  }

  //React.useEffect(()=>{
    //if(state.user.data.photo!==''){
      //setImage(state.user.data.photo);
   // }
  //});

  function updateProfile(values) {
    handlers.updateUser(state.user.data.id, values, () => {
      setDialog(false);
      handlers.updateLocalData(values);
      alert('Kyc Updated Click request For verification!');
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Portal>
        <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
          <UpdateKyc
          user={state.user.data}
          onDismiss={() => setDialog(false)}
          onFinish={updateProfile}
          />
        </Dialog>
      </Portal>
      
      <View style={styles.profile}>
      
        <View style={styles.profile_container}>
          {/* <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{uri: 'https://picsum.photos/200'}}
            />
          </View> */}
          <View style={styles.details}>
          <Image
            style={styles.image}
            source={{uri:state.user.data.photo}}
            />
            <Text style={styles.name}>{state.user.data.name}</Text>
            <Text style={styles.mail}>{state.user.data.email}</Text>
            <Text style={{textTransform: 'uppercase'}}>
              {state.user.data.type}
            </Text>
            <View style={styles.actions}>
              <Button
                icon="power"
                color={RED}
                onPress={() => showScreen('logout')}>
                Logout
              </Button>
              {state.user.data.type === 'casual' ?
                <Button color={BLUE} icon="pencil" onPress={() => setDialog(true)}>
                UPDATE KYC
              </Button> :
              <Button color={BLUE} icon="pencil" onPress={() => setDialog(true)}>
              Profile
            </Button>
              }
            </View>
            { state.user.data.type !== 'admin'&&
              state.user.data.type !== 'designated' &&
              state.user.data.type !== 'requestor' && 
              state.user.data.aadhar !== null &&
              (
                <Button 
                icon="key"
                color={ORANGE}
                onPress={createRequest}>REQUEST</Button>
              )}
          </View>
        </View>
        <View style={styles.menu}>
          {state.user.data.type !== 'casual'&&
          state.user.data.type !== 'requestor'&&(
            <Text style={styles.menu_container}>MENU OPTIONS</Text>
          )}
          <View style={styles.menu_list}>
            {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && (
                <List.Item
                  title="MEETINGS"
                  onPress={() => showScreen('meetings')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon {...icon_props} color={BLUE} icon="calendar" />
                  )}
                />
              )}
            {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && 
              state.user.data.type !== 'designated' &&(
                <List.Item
                  title="SLOTS"
                  onPress={() => showScreen('slots')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon {...icon_props} color="orange" icon="slot-machine-outline" />
                  )}
                />
              )}
            {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && (
                <List.Item
                  title="COMPLAINTS"
                  onPress={() => showScreen('complaints')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon {...icon_props} color={GREEN} icon="file-document-edit-outline" />
                  )}
                />
              )}
            {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && (
                <List.Item
                  title="ALL NEWS"
                  onPress={() => showScreen('news')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon {...icon_props} color={RED} icon="newspaper" />
                  )}
                />
              )}
              {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && 
              state.user.data.type !== 'designated' &&(
                <List.Item
                  title="DESIGNATED & ADMIN"
                  onPress={() => showScreen('admin')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon
                      {...icon_props}
                      color={TGREEN}
                      icon="badge-account"
                    />
                  )}
                />
              )}
            {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && 
              state.user.data.type !== 'designated' &&(
                <List.Item
                  title="REQUEST USERS"
                  onPress={() => showScreen('requests')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon
                      {...icon_props}
                      color={YELLOW}
                      icon="badge-account"
                    />
                  )}
                />
              )}
              {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && 
              state.user.data.type !== 'designated' &&(
                <List.Item
                  title="USERS"
                  onPress={() => showScreen('user')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon
                      {...icon_props}
                      color='#349eeb'
                      icon="kabaddi"
                    />
                  )}
                />
              )}
            {state.user.data.type !== 'requestor' &&
              state.user.data.type !== 'casual' && 
              state.user.data.type !== 'designated' &&(
                <List.Item
                  title="LOCATIONS"
                  onPress={() => showScreen('location')}
                  right={(icon_props) => (
                    <List.Icon {...icon_props} icon="arrow-right" />
                  )}
                  left={(icon_props) => (
                    <List.Icon
                      {...icon_props}
                      color={BLUE}
                      icon="location-enter"
                    />
                  )}
                />
              )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;
