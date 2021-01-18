import React from 'react';
import {Picker,TouchableOpacity,View,Image} from 'react-native';
import {Card, Button, Text, Paragraph} from 'react-native-paper';

import styles from './usercard-styles';
import {Context} from 'store';

 export function RequestCard(props) {
  const {state} = React.useContext(Context);

  const is_same = state.user.data.id === props.id;

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
        {is_same ? (
          <Text style={{padding: 10}}>CAN'T CHANGE FOR SELF!</Text>
        ) : (
          <Picker
            style={{height: 50, width: 200, padding: 10}}
            selectedValue={props.type}
            onValueChange={(itemValue, itemIndex) =>
              props.onSelect(itemValue, props)
            }>
            <Picker.Item label="CASUAL" value="casual" />
            <Picker.Item label="REQUESTOR" value="requestor" />
            <Picker.Item label="DESIGNATED" value="designated" />
            <Picker.Item label="ADMIN" value="admin" />
          </Picker>
        )}
      </Card.Actions>
    </Card>
    </TouchableOpacity>
  );
}
