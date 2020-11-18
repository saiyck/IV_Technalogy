import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
// import {SharedElement} from 'react-native-shared-element';
import {Card, Button, Text} from 'react-native-paper';

import styles from './usercard-styles';
import {RED, GREEN} from 'globals/constants';

function UserCard(props) {
  return (
    <TouchableOpacity onPress={() => props.onSelect('view', props.index)}>
      <Card style={styles.container}>
        <Card.Title
          title={props.name}
          subtitle={`${props.type} / ${props.email ? props.email : 'NO EMAIL'}`}
        />
        <Card.Actions style={styles.actions}>
          {props.status ? (
            <Text style={{padding: 10, textTransform: 'uppercase'}}>
              {props.status}
            </Text>
          ) : (
            <>
              <Button
                color={GREEN}
                onPress={() => props.onSelect('accept', props)}>
                ACCEPT
              </Button>
              <Button
                color={RED}
                onPress={() => props.onSelect('reject', props)}>
                REJECT
              </Button>
            </>
          )}
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

// UserCard.sharedElements = function (navigation, otherRoute) {
//   const index = otherRoute.params.index;
//   return [`image-${index}`];
// };

UserCard.propTypes = {
  onSelect: PropTypes.func,
  index: PropTypes.number,
};

export default UserCard;
