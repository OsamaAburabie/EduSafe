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
  const {user, events, unseenEventsNum, setUnseenEventsNum} = useMainContext();

  const updateSeenLocal = () => {
    setUnseenEventsNum(null);
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
    if (unseenEventsNum == null) return;
    updateSeenLocal();
    updateSeenRequest();
  }, []);

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
