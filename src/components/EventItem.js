import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {useMainContext} from '../../context/MainContextProvider';
import axios from '../../config/axios';

const EventItem = ({
  id,
  title,
  description,
  date,
  totalInvited,
  totalJoined,
  joining,
}) => {
  const [join, setJoin] = useState(joining);
  const [tjoined, setTjoined] = useState(totalJoined);
  const [isLoading, setIsLoading] = useState(false);
  const {user, events, setEvents} = useMainContext();

  const updateEventState = (id, joiningState, totJoined) => {
    const newEvents = events.map(event => {
      if (event.id === id) {
        return {...event, joining: joiningState, totalJoined: totJoined};
      }
      return event;
    });
    setEvents(newEvents);
  };

  const fetch = async id => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/student/join_event/${id}`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.data.success) {
        if (res.data.joining) {
          setJoin(true);
          setTjoined(tjoined + 1);
          updateEventState(id, true, tjoined + 1);
        } else {
          setJoin(false);
          setTjoined(tjoined - 1);
          updateEventState(id, false, tjoined - 1);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
    }
  };
  const handleJoin = () => {
    if (isLoading) return;
    fetch(id);
  };

  //make the first letter of the title uppercase
  const titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
  const formatedDate = dayjs(date).format('MMM D, h:mm A');
  return (
    <View key={id} style={styles.eventContainer}>
      <View>
        <Text style={[styles.eventTitle, {marginBottom: description ? 0 : 5}]}>
          {titleUpper}
        </Text>
        {description && (
          <Text style={[styles.text, {marginBottom: 5}]}>{description}</Text>
        )}
        <View style={styles.eventDate}>
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={COLORS.primary}
          />
          <Text style={styles.text}>{formatedDate}</Text>
        </View>
        <View style={styles.eventStats}>
          <MaterialCommunityIcons
            name="account"
            size={20}
            color={COLORS.primary}
          />
          <Text style={[styles.text, {marginRight: 8, fontWeight: 'bold'}]}>
            {totalInvited} invited
          </Text>
          <MaterialCommunityIcons
            name="account-check"
            size={20}
            color={COLORS.primary}
          />
          <Text style={[styles.text, {marginRight: 8, fontWeight: 'bold'}]}>
            {tjoined} joined
          </Text>
        </View>
      </View>
      <View style={styles.eventControls}>
        <TouchableWithoutFeedback onPress={handleJoin}>
          <View
            style={[
              styles.joinButton,
              {backgroundColor: join ? COLORS.white : COLORS.primary},
            ]}>
            <Text
              style={[
                styles.joinButtonText,
                {color: join ? COLORS.primary : COLORS.white},
              ]}>
              {join ? 'Joined' : 'Join'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.joinButton,
            {
              backgroundColor: COLORS.white,
            },
          ]}>
          <MaterialCommunityIcons
            name="qrcode"
            size={22}
            color={COLORS.primary}
          />
        </View>
      </View>
    </View>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  eventContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.lightWhite,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventStats: {
    flexDirection: 'row',
  },
  eventTitle: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  eventControls: {
    flexDirection: 'column',
  },
  joinButton: {
    height: 30,
    width: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginBottom: 8,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  joinButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    flexDirection: 'row',
  },
  text: {
    color: COLORS.gray,
  },
});
