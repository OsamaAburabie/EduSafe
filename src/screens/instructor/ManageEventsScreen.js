import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS} from '../../../utils/colors';
import axios from '../../../config/axios';
import {useMainContext} from '../../../context/MainContextProvider';
import {ScrollView} from 'react-native-gesture-handler';
import InstructorEventItem from '../../components/InstructorEventItem';
const ManageEventsScreen = ({navigation}) => {
  const {token} = useMainContext();
  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`/api/instructor/my_events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.success) {
        setEvents(res.data.events);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`${error} at fetchEvents`);
      setIsLoading(false);
    }
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchEvents();
    setRefreshing(false);
  }, []);

  // React.useEffect(() => {
  //   fetchEvents();
  // }, []);

  React.useEffect(() => {
    const unSubs = [
      navigation.addListener('focus', () => {
        fetchEvents();
      }),
    ];

    return () => {
      unSubs.forEach(unsub => unsub());
    };
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      {isLoading && (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      {events && events.length > 0 && !isLoading && (
        <FlatList
          data={events}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={COLORS.white}
              colors={[COLORS.primary]}
            />
          }
          renderItem={({item}) => <InstructorEventItem {...item} />}
          style={styles.container}
        />
      )}

      {!isLoading && !events.length && (
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={COLORS.white}
              colors={[COLORS.primary]}
            />
          }>
          <Text style={{color: COLORS.primary, fontSize: 16}}>
            No events to show
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default ManageEventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
