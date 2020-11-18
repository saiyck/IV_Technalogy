import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import {Button, Dialog, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import styles from './profile-style';

const re = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mobile: /[0-9]{10}/,
};

const UpdateForm = (props) => {
  const [show, setShow] = React.useState(false);
  const [fields, setFields] = React.useState({
    email: props.user.email,
    mobile: props.user.mobile,
    name: props.user.name,
    dob: props.user.dob ? props.user.dob : new Date(),
    
  });

  const changeField = (k) => (v) => {
    setShow(false);
    if (k === 'dob') {
      setFields({...fields, [k]: v.nativeEvent.timestamp});
    } else {
      setFields({...fields, [k]: v});
    }
  };

  function handleSubmit() {
    let ok = true;
    Object.keys(fields).forEach((k) => {
      if (ok) {
        if (!fields[k] || fields[k] === '') {
          ok = false;
        }

        if (ok) {
          switch (k) {
            case 'email':
              ok = re.email.test(fields[k].toLowerCase());
              break;
            case 'mobile':
              ok = re.mobile.test(fields[k].toLowerCase());
              break;
          }
        }
      }
    });

    if (!ok) {
      alert('SOME FIELDS ARE NOT VALID!');
    } else {
      if (fields.dob) {
        fields.dob = new Date(fields.dob);
      }
      props.onFinish(fields);
    }
  }

  return (
    <>
      {show && (
        <DateTimePicker
          value={moment(fields.dob).toDate()}
          mode="date"
          onChange={changeField('dob')}
        />
      )}
      <Dialog.Title>PROFILE DETAILS</Dialog.Title>
      <Dialog.Content>
        <View>
          <TextInput
            placeholder="NAME"
            style={styles.field}
            value={fields.name}
            onChangeText={changeField('name')}
          />
          <TextInput
            placeholder="EMAIL"
            style={styles.field}
            disabled={Boolean(props.user.email)}
            value={fields.email}
            onChangeText={changeField('email')}
          />
          <TouchableHighlight onPress={() => setShow(true)}>
            <TextInput
              placeholder="DATE OF BIRTH"
              disabled
              style={styles.field}
              value={moment(fields.dob).format('DD-MM-YYYY')}
            />
          </TouchableHighlight>
          <TextInput
            placeholder="MOBILE"
            maxLength={10}
            disabled={Boolean(props.user.mobile)}
            keyboardType="phone-pad"
            style={styles.field}
            value={fields.mobile}
            onChangeText={(t) => changeField('mobile')(t)}
          />
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleSubmit}>UPDATE</Button>
        <Button onPress={props.onDismiss}>CANCEL</Button>
      </Dialog.Actions>
    </>
  );
};

export default UpdateForm;
