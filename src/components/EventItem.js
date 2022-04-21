import {
  StyleSheet,
  Text,
  Touchable,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple} from 'react-native-paper';
import {TouchableHighlight} from 'react-native-gesture-handler';
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
  const [tinvited, setTinvited] = useState(totalInvited);
  const [tjoined, setTjoined] = useState(totalJoined);

  const handleJoin = () => {
    if (join) {
      setJoin(false);
      setTjoined(tjoined - 1);
    } else {
      setJoin(true);
      setTjoined(tjoined + 1);
    }
  };

  return (
    <View key={id} style={styles.eventContainer}>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDescription}>{description}</Text>
        <View style={styles.eventDate}>
          <MaterialCommunityIcons name="calendar" size={20} />
          <Text style={styles.eventDateText}>{date}</Text>
        </View>
        <View style={styles.eventStats}>
          <MaterialCommunityIcons name="account" size={20} />
          <Text style={styles.eventStatsText}>{tinvited} invited</Text>
          <MaterialCommunityIcons name="account-check" size={20} />
          <Text style={styles.eventStatsText}>{tjoined} joined</Text>
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventInfo: {},
  eventStats: {
    flexDirection: 'row',
  },
  eventStatsText: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
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
});
