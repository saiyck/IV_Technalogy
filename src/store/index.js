import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import initialState from './intialState';
import * as handlers from './handlers';
import {storage_items} from 'constants';

export const Context = React.createContext({
  state: initialState,
  handlers,
});

export function Provider(props) {
  const [state, setState] = React.useState(initialState);

  const modHandlers = {};

  Object.keys(handlers).map(
    (key) => (modHandlers[key] = handlers[key](state, setState)),
  );

  React.useEffect(() => {
    AsyncStorage.multiGet([storage_items.user_data, storage_items.token]).then(
      (data) => {
        if (data[0][1] && data[1][1]) {
          setState({
            ...state,
            user: {
              ...state.user,
              data: JSON.parse(data[0][1]),
              token: data[1][1],
            },
          });
        }
      },
    );
  }, []);

  return (
    <Context.Provider value={{state, handlers: modHandlers}}>
      {props.children}
    </Context.Provider>
  );
}
