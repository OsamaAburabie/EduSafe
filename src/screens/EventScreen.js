import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils/colors';
import EventItem from '../components/EventItem';
import axios from '../../config/axios';
import {useMainContext} from '../../context/MainContextProvider';
const EventScreen = () => {
  const {events} = useMainContext();

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
