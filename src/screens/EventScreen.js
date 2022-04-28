import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import EventItem from '../components/EventItem';
import axios from '../../config/axios';
import {useMainContext} from '../../context/MainContextProvider';
const EventScreen = ({navigation}) => {
  const {user, events, setEvents} = useMainContext();

  const unseenEvents = events && events.filter(event => !event.seen);

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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!unseenEvents.length) return;
      updateSeenLocal();
      updateSeenRequest();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <FlatList
        data={events}
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
