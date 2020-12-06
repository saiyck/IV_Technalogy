import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity,View,Image} from 'react-native';
// import {SharedElement} from 'react-native-shared-element';
import {Card, Button, Text} from 'react-native-paper';

import styles from './usercard-styles';
import {RED, GREEN} from 'globals/constants';



function UserCard(props) {
  return (
    <TouchableOpacity onPress={() => props.onOpen(props.index)}>
      <Card style={styles.container}>
        <View style={styles.userCard}>
          <Image style={styles.userImage} source={{uri:`${props.photo}`}}/>
          <View style={styles.userText}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={styles.emailText}>{`${props.type} / ${props.email ? props.email : 'NO EMAIL'}`}</Text>
          </View>
        </View>
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
