import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/colors';

const EventDetailsScreen = ({route}) => {
  const {eventDetails} = route.params;
  return (
    <View style={styles.eventContainer}>
      <Text
        style={{
          fontSize: 16,
          color: COLORS.gray,
          fontWeight: 'bold',
        }}>
        {eventDetails?.description}
      </Text>
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  eventContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.lightWhite,
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
