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
import {useMainContext} from '../../../context/MainContextProvider';
import {ScrollView} from 'react-native-gesture-handler';
import InstructorEventItem from '../../components/InstructorEventItem';
const ManageEventsScreen = ({navigation}) => {
  const {instructorEvents, fetchInstructorEvents} = useMainContext();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchInstructorEvents();
    setRefreshing(false);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      {instructorEvents && instructorEvents.length > 0 && (
        <FlatList
          data={instructorEvents}
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

      {!instructorEvents?.length && (
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
