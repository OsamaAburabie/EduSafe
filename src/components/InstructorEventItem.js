import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import {useMainContext} from '../../context/MainContextProvider';
import axios from '../../config/axios';
import {useNavigation} from '@react-navigation/native';
const InstructorEventItem = ({
  id,
  title,
  description,
  date,
  totalInvited,
  totalJoined,
  valuePoints,
}) => {
  const navigation = useNavigation();

  //make the first letter of the title uppercase
  const titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
  const formatedDate = dayjs(date).format('MMM D, h:mm A');

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('EventsStack', {
          screen: 'EventDetails',
          params: {
            id,
          },
        })
      }>
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
            {description !== '' && (
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
            <Text style={[styles.text, {marginRight: 8}]}>{formatedDate}</Text>
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
              {totalJoined} joined
            </Text>
          </View>
        </View>
        <View style={styles.eventControls}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('EventsStack', {
                screen: 'EditEvent',
                params: {
                  id,
                  title,
                  description,
                  date,
                  valuePoints,
                },
              })
            }>
            <View
              style={[
                styles.joinButton,
                {
                  backgroundColor: COLORS.white,
                },
              ]}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={22}
                color={COLORS.primary}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{width: 5}}></View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('EventsStack', {
                screen: 'MakeInvites',
                params: {
                  id,
                },
              })
            }>
            <View
              style={[
                styles.joinButton,
                {
                  backgroundColor: COLORS.white,
                },
              ]}>
              <MaterialIcons
                name="person-add-alt"
                size={22}
                color={COLORS.primary}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InstructorEventItem;

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
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventInfo: {},
  eventStats: {
    flexDirection: 'row',
  },
  eventTitle: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '500',
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
