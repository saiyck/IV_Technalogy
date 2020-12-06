import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {Card, TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import moment from 'moment';

import {Context} from 'store';
import { GREEN } from 'globals/constants';

const initial_values = {
  date: new Date(),
  start_time: new Date(),
  end_time: new Date(),
  duration: 15,
};

export function SlotForm() {
  const [show, setShow] = React.useState(false);
  const [show_start, setShowStart] = React.useState(false);
  const [show_end, setShowEnd] = React.useState(false);
  const [field, setField] = React.useState(initial_values);
  const {handlers} = React.useContext(Context);

  function handleChange(type, value) {
    console.info('VALUE CHECK', {type, value});
    if (value) {
      if (type === 'start_time' || type === 'end_time') {
        const up_date = moment(field.date).format('YYYY-MM-DD');
        const up_time = moment(value).format('HH:mm');
        value = moment(up_date + ' ' + up_time, 'YYYY-MM-DD HH:mm').toDate();
      } else {
        const up_date = moment(field.date).format('YYYY-MM-DD');
        const start_time = moment(field.start_time).format('HH:mm');
        const end_time = moment(field.end_time).format('HH:mm');
        field.start_time = moment(
          up_date + '' + start_time,
          'YYYY-MM-DD HH:mm',
        ).toDate();
        field.end_time = moment(
          up_date + '' + end_time,
          'YYYY-MM-DD HH:mm',
        ).toDate();
      }
      setField({...field, [type]: value});
    }
    console.info('FIELD', {type, value});
    setShow(false);
    setShowStart(false);
    setShowEnd(false);
  }

  function handleSubmit() {
    handlers.addSlot(field, () => {
      setField(initial_values);
    });
  }

  return (
    <>
      {show && (
        <DateTimePicker
          mode="date"
          value={field.date}
          onChange={(v, dt) => handleChange('date', dt)}
        />
      )}
      {show_start && (
        <DateTimePicker
          mode="time"
          value={field.start_time}
          onChange={(v, dt) => handleChange('start_time', dt)}
        />
      )}
      {show_end && (
        <DateTimePicker
          mode="time"
          value={field.end_time}
          onChange={(v, dt) => handleChange('end_time', dt)}
        />
      )}
      <View>
        <Card>
          <Text
            style={{fontSize: 20, paddingVertical: 10, paddingHorizontal: 20}}>
            DURATION FORM
          </Text>
          <Card.Content>
            <TouchableHighlight onPress={() => setShow(true)}>
              <TextInput
                label="SLOT DATE"
                style={{marginVertical: 15}}
                placeholder="SLOT DATE"
                disabled
                value={moment(field.date).format('DD-MM-YYYY')}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setShowStart(true)}>
              <TextInput
                label="START TIME"
                style={{marginVertical: 15}}
                disabled
                value={moment(field.start_time).format('HH:mm')}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setShowEnd(true)}>
              <TextInput
                label="END TIME"
                style={{marginVertical: 15}}
                disabled
                value={moment(field.end_time).format('HH:mm')}
              />
            </TouchableHighlight>
            <Card.Content style={{marginVertical: 15}}>
              <Text>SELECT DURATION</Text>
              <Picker
                selectedValue={field.duration}
                onValueChange={(v) => handleChange('duration', v)}>
                {['15', '30', '45', '60'].map((opt) => (
                  <Picker.Item label={opt} value={opt} />
                ))}
              </Picker>
            </Card.Content>
            <Button color={GREEN} onPress={handleSubmit}>ADD DURATION</Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
