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
import {useMainContext} from '../../../context/MainContextProvider';
import {COLORS} from '../../../utils/colors';
import dayjs from 'dayjs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InvitationItem from '../../components/InvitationItem';

const EventDetailsScreen = ({route}) => {
  const {token} = useMainContext();
  const {id} = route.params;
  const [event, setEvent] = useState(null);

  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(`/api/instructor/event_details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.success) {
        setEvent(res.data.event);
      }
    } catch (error) {
      console.log(`${error} at fetchEventDetails`);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

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
          width: '100%',
          height: 90,
          backgroundColor: COLORS.primary,
          borderRadius: 5,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: COLORS.white,
          }}>
          {event.title}
        </Text>

        <Text
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: COLORS.white,
          }}>
          {dayjs(event?.date).format('MMM D, h:mm A')}
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <MaterialCommunityIcons
            name="account"
            size={20}
            color={COLORS.white}
          />
          <Text
            style={{marginRight: 5, fontWeight: 'bold', color: COLORS.white}}>
            {event?.totalInvited} invited
          </Text>
          <MaterialCommunityIcons
            name="account-check"
            size={20}
            color={COLORS.white}
          />
          <Text
            style={{marginRight: 5, fontWeight: 'bold', color: COLORS.white}}>
            {event?.totalJoined} joined
          </Text>
          <MaterialCommunityIcons name="eye" size={20} color={COLORS.white} />
          <Text
            style={{
              marginRight: 5,
              marginLeft: 1,
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            {event?.totalSeen} Seen
          </Text>
        </View>
      </View>

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
          data={event?.Invitations}
          keyExtractor={item => item.id}
          renderItem={({item}) => <InvitationItem {...item} />}
          style={{width: '100%'}}
        />
      </View>
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});
