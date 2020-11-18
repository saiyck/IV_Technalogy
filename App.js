import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Linking, PermissionsAndroid} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Deeplinking from 'react-native-deep-linking';
import messaging from '@react-native-firebase/messaging';
import Survicate from '@survicate/react-native-survicate';

import {Provider as AppProvider} from 'store';
import Main from 'navigation';
import theme from 'globals/theme';
import {base_url} from 'globals/constants';

const ThemeWrapper = (props) => {
  return <PaperProvider theme={theme}>{props.children}</PaperProvider>;
};

const App = () => {
  const nav_ref = React.createRef();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 3000);
    requestUserPermission();
    PermissionsAndroid.requestMultiple([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ]);
  }, []);

  React.useEffect(() => {
    Deeplinking.addScheme(base_url);
    Survicate.initialize();
  }, []);

  return (
    <>
      <AppProvider>
        <NavigationContainer ref={nav_ref}>
          <ThemeWrapper>
            <Main nav_ref={nav_ref} />
          </ThemeWrapper>
        </NavigationContainer>
      </AppProvider>
    </>
  );
};

// TODO: incase map failed 👇
// https://stackoverflow.com/questions/55156193/react-native-task-react-native-mapscompiledebugrenderscript-failed

// TODO: incase react-native-audiotoolkit failed 👇
// set min

export default App;
