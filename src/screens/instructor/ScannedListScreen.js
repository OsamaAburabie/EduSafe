import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from '../../../config/axios';
import {COLORS} from '../../../utils/colors';
import dayjs from 'dayjs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InvitationItem from '../../components/InvitationItem';

const ScannedListScreen = ({route}) => {
  const {id, event} = route.params;
  //   const [event, setEvent] = useState(null);

  const filteredEvents = event?.Invitations?.filter(evt => evt.scanned);

  if (!event)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <Text>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          marginVertical: 10,
          elevation: 2,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <FlatList
          data={filteredEvents}
          keyExtractor={item => item.id}
          renderItem={({item}) => <InvitationItem {...item} />}
          style={{width: '100%'}}
        />
      </View>
    </View>
  );
};

export default ScannedListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});
