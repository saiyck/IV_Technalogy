import React from 'react';
import {View, ScrollView, Text, TouchableHighlight} from 'react-native';
import {Card, TextInput} from 'react-native-paper';
import {FAB} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Loading from 'components/Loading';
import {Context} from 'store';
import styles from './meeting-style';
import routes from 'navigation/routes';

const initial_values = {
  title: '',
  purpose: '',
  slot: '',
  scheduled_on: new Date(),
};

export function MeetingForm(props) {
  const title_text =
    props.type !== 'edit' ? 'CREATE MEETING' : 'UPDATE MEETING';
  const [field, setField] = React.useState(initial_values);
  const {state, handlers} = React.useContext(Context);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const [booked_dates, setBookedDates] = React.useState([]);

  React.useEffect(() => {
    handlers.getMeeting(({meetings, durations}) => {
      const all_dates = meetings.map((m) =>
        moment(m.scheduled_on).format('YYYY-MM-DD'),
      );
      // setBookedDates(all_dates);
    });
  }, []);

  const selected_date = state.durations.find(
    (x) =>
      moment(x.date).format('YYYY-MM-DD') ===
      moment(field.scheduled_on).format('YYYY-MM-DD'),
  );

  let slots = getSlots(selected_date);

  function getSlots(_slot = {}) {
    try {
      const dts = state.meetings
        .filter(
          (v) =>
            moment(v.scheduled_on).format('YYYY-MM-DD') ===
            moment(field.scheduled_on).format('YYYY-MM-DD'),
        )
        .map((v) => moment(v.scheduled_on).format('HH:mm'));

      console.info('DATES', dts);

      const {duration = 15, start_time, end_time} = _slot;
      var startTime = moment(start_time);
      var endTime = moment(end_time);

      if (!start_time || !end_time) {
        startTime = moment('11:00', 'HH:mm');
        endTime = moment('02:00', 'HH:mm');
      }

      if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
      }

      var slots_ = [];

      while (startTime <= endTime) {
        const dts2 = new moment(startTime).format('HH:mm');
        if (!dts.includes(dts2)) {
          slots_.push(dts2);
        }
        startTime.add(duration, 'minutes');
      }
      return slots_;
    } catch (err) {
      return [];
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    let ok = true;
    Object.keys(field).map((k) => {
      if (ok) {
        if (field[k] === '') {
          ok = false;
        }
      }
    });
    if (ok) {
      field.duration = selected_date?.duration ? selected_date.duration : 15;
      const {slot, ...rest} = field;
      handlers.createMeeting(rest, () => {
        setLoading(false);
        handlers.getUserMeeting();
        props.navigation.navigate(routes.meeting);
      });
    } else {
      alert('SOME VALUES ARE EMPTY!');
    }
    setLoading(false);
  };

  const handleChange = (type, value) => {
    setShow(false);
    if (type === 'slot') {
      const dt = moment(field.scheduled_on).format('YYYY-MM-DD');
      console.info('TYPE SLOT', {
        dt,
        value,
        converted: moment(dt + ' ' + value, 'YYYY-MM-DD HH:mm').toDate(),
      });
      setField({
        ...field,
        slot: value,
        scheduled_on: moment(dt + ' ' + value, 'YYYY-MM-DD HH:mm').toDate(),
      });
    } else if (type === 'scheduled_on') {
      const tym = moment(field.scheduled_on).format('HH:mm');
      const dt = moment(value).format('YYYY-MM-DD');
      setField({
        ...field,
        scheduled_on: moment(dt + ' ' + tym, 'YYYY-MM-DD HH:mm').toDate(),
      });
    } else {
      setField({...field, [type]: value});
    }
  };

  return (
    <>
      {show && (
        <DateTimePicker
          minimumDate={moment().toDate()}
          value={field.scheduled_on}
          onChange={(v, dt) => handleChange('scheduled_on', dt)}
        />
      )}
      <View style={styles.meeting_container}>
        {loading && <Loading />}
        <ScrollView style={styles.container}>
          <Card.Title
            title={title_text}
            style={styles.title}
            subtitle="Please enter the details of your meeting"
          />
          <View style={styles.field}>
            <Text style={styles.label}>SCHEDULE A SLOT</Text>
            <TouchableHighlight onPress={() => setShow(true)}>
              <TextInput
                label="SLOT DATE"
                placeholder="SLOT DATE"
                disabled
                value={moment(field.scheduled_on).format('DD-MM-YYYY')}
              />
            </TouchableHighlight>
            <Card.Content style={{marginTop: 30}}>
              {slots.length ? (
                <Picker
                  selectedValue={field.slot}
                  onValueChange={(v) => handleChange('slot', v)}>
                  {slots.map((opt) => (
                    <Picker.Item label={opt} value={opt} />
                  ))}
                </Picker>
              ) : (
                <Text>MEETINGS ARE FULLED</Text>
              )}
            </Card.Content>
            {/* <Calendar
            onDayPress={(v) => handleChange('scheduled_on', v.dateString)}
            markedDates={{
              [field.scheduled_on]: {
                selected: true,
                selectedColor: '#1976d2',
                selectedTextColor: 'white',
              },
              ...dates,
            }}
          /> */}
          </View>
          <TextInput
            style={styles.field}
            label="TITLE"
            onChangeText={(text) => handleChange('title', text)}
          />
          <TextInput
            style={styles.field}
            multiline
            numberOfLines={10}
            label="PURPOUSE"
            onChangeText={(text) => handleChange('purpose', text)}
          />
          
        </ScrollView>
        <View style={styles.fabView}>
        <Text style={styles.fabText}>Submit Meeting</Text> 
        <FAB
          disabled={!slots.length || loading}
          style={styles.fab}
          icon="plus"
          onPress={handleSubmit}
        />
        </View>
      </View>
    </>
  );
}
