import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {useMainContext} from '../../context/MainContextProvider';
import axios from '../../config/axios';
import Modal from 'react-native-modal';
import EventQrModal from './EventQrModal';
import {useNavigation} from '@react-navigation/native';
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
  const {user} = useMainContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const fetch = async id => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/student/join_event/${id}`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.data?.success) {
        if (res.data.joining) {
          setJoin(true);
          setTjoined(tjoined + 1);
        } else {
          setJoin(false);
          setTjoined(tjoined - 1);
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

  const onHide = () => {
    setIsModalVisible(false);
  };

  //make the first letter of the title uppercase
  const titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
  const formatedDate = dayjs(date).format('MMM D, h:mm A');
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EventDetails')}>
        <View key={id} style={styles.eventContainer}>
          <View style={styles.eventInfo}>
            <View>
              <Text
                style={[
                  styles.eventTitle,
                  {
                    marginBottom: description ? -5 : 2,
                  },
                ]}>
                {titleUpper}
              </Text>
              {description && (
                <Text style={[styles.text, {marginBottom: 4}]}>
                  {description}
                </Text>
              )}
            </View>
            <View style={styles.eventDate}>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={COLORS.primary}
              />
              <Text style={[styles.text, {marginRight: 8}]}>
                {formatedDate}
              </Text>
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
                  {join && (
                    <MaterialCommunityIcons
                      name="account-check"
                      size={20}
                      color={COLORS.primary}
                    />
                  )}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{width: 10}}></View>
            {join && (
              <TouchableWithoutFeedback onPress={() => setIsModalVisible(true)}>
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
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        testID={'modal'}
        isVisible={isModalVisible}
        onSwipeComplete={onHide}
        swipeDirection={'down'}
        onBackdropPress={onHide}
        backdropOpacity={0.5}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        style={styles.modalView}>
        <EventQrModal inviteId={id} />
      </Modal>
    </>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  eventContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.lightWhite,
    paddingVertical: 2,
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventInfo: {},
  eventStats: {
    flexDirection: 'row',
  },
  eventTitle: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  eventControls: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  joinButton: {
    height: 30,
    width: 85,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
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
