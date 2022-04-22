import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS} from '../../utils/colors';
import EventItem from '../components/EventItem';
import axios from '../../config/axios';
import {useMainContext} from '../../context/MainContextProvider';
import {useFocusEffect} from '@react-navigation/native';
const EventScreen = () => {
  const {user, events, setEvents} = useMainContext();

  //update all events to seen when the screen is loaded
  const updateSeenLocal = () => {
    setEvents(
      events.map(event => {
        event.seen = true;
        return event;
      }),
    );
  };

  const updateSeenRequest = async () => {
    try {
      axios.put(`/api/student/update_seen`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      updateSeenLocal();
      updateSeenRequest();
    }, []),
  );

  return (
    <FlatList
      data={events}
      renderItem={({item}) => <EventItem {...item} />}
      style={styles.container}
    />
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
