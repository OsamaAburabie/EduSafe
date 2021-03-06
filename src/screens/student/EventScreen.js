import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS} from '../../../utils/colors';
import EventItem from '../../components/EventItem';
import axios from '../../../config/axios';
import {useMainContext} from '../../../context/MainContextProvider';
const EventScreen = ({navigation}) => {
  const {events, setEvents, fetchEvents} = useMainContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchEvents();
    setRefreshing(false);
  }, []);

  const updateSeenLocal = useCallback(() => {
    setEvents({
      ...events,
      unseenNumber: null,
    });
  }, [events]);

  const updateSeenRequest = async () => {
    try {
      axios.put(`/api/student/update_seen`, null);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  React.useEffect(() => {
    if (events.unseenNumber == null) return;
    const unSubs = [
      navigation.addListener('focus', () => {
        updateSeenLocal();
        updateSeenRequest();
      }),
      navigation.addListener('blur', () => {
        updateSeenLocal();
        updateSeenRequest();
      }),
    ];

    return () => {
      unSubs.forEach(unsub => unsub());
    };
  }, [navigation, events]);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <FlatList
        data={events?.events}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={COLORS.white}
            colors={[COLORS.primary]}
          />
        }
        renderItem={({item}) => <EventItem {...item} />}
        style={styles.container}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{color: COLORS.primary, fontSize: 16}}>
              No events to show
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '80%',
  },
});
