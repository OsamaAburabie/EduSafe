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
import {COLORS} from '../../../utils/colors';
import EventItem from '../../components/EventItem';
import axios from '../../../config/axios';
import {useMainContext} from '../../../context/MainContextProvider';
const EventScreen = ({navigation}) => {
  const {token, events, setEvents} = useMainContext();

  const updateSeenLocal = () => {
    setEvents({
      ...events,
      unseenNumber: null,
    });
  };

  const updateSeenRequest = async () => {
    try {
      axios.put(`/api/student/update_seen`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  React.useEffect(() => {
    if (events?.unseenNumber == null) return;
    updateSeenLocal();
    updateSeenRequest();
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <FlatList
        data={events?.events}
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
