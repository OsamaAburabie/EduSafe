import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EventItem from '../components/EventItem';

const EventScreen = () => {
  const initialState = [
    {
      id: '3975aa1b-10f3-4ba6-804c-468f4cab1231',
      joining: false,
      title: 'pool',
      description: 'pool dummy description',
      date: '1970-01-01T00:00:00.000Z',
      totalInvited: 50,
      totalJoined: 9,
    },
    {
      id: '3975aa1b-10f3-4ba6-804c-468f4cab1232',
      joining: false,
      title: 'workshop',
      description: 'workshop dummy description',
      date: '1970-01-01T00:00:00.000Z',
      totalInvited: 10,
      totalJoined: 2,
    },
    {
      id: '3975aa1b-10f3-4ba6-804c-468f4cab1233',
      joining: false,
      title: 'workout',
      description: 'workout dummy description',
      date: '1970-01-01T00:00:00.000Z',
      totalInvited: 20,
      totalJoined: 3,
    },
  ];
  const [events, setEvents] = useState(initialState);
  return (
    <View style={styles.container}>
      {events.map(event => (
        <EventItem key={event.id} {...event} />
      ))}
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
});
