import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

const PenaltyItem = ({
  id,
  seen,
  type,
  valuePointsDecrement,
  createdAt,
  IssuedBy,
}) => {
  const formatedDate = dayjs(createdAt).format('MMM D, h:mm A');

  console.log(IssuedBy);

  const firstName =
    IssuedBy?.firstName.charAt(0).toUpperCase() + IssuedBy?.firstName.slice(1);
  const lastName =
    IssuedBy?.lastName.charAt(0).toUpperCase() + IssuedBy?.lastName.slice(1);

  const capType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <View style={styles.penaltyContainer}>
      <View style={styles.penaltyInfo}>
        <View style={styles.penaltyTextItem}>
          <MaterialCommunityIcons
            name="account"
            size={20}
            color={COLORS.primary}
          />
          <Text style={[styles.mainText]}>
            Issued By:{' '}
            <Text style={[styles.subText]}>
              Dr.{firstName} {lastName}
            </Text>
          </Text>
        </View>
        <View style={styles.penaltyTextItem}>
          <MaterialCommunityIcons
            name="head-question"
            size={20}
            color={COLORS.primary}
          />
          <Text style={[styles.mainText]}>
            Cause: <Text style={[styles.subText]}>{capType}</Text>
          </Text>
        </View>
        <View style={styles.penaltyTextItem}>
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={COLORS.primary}
          />
          <Text style={[styles.mainText]}>{formatedDate}</Text>
        </View>
      </View>
      <View style={{}}>
        <Text style={[{color: 'red', marginRight: 0, fontSize: 14}]}>
          -{valuePointsDecrement} Points
        </Text>
      </View>
    </View>
  );
};

export default PenaltyItem;

const styles = StyleSheet.create({
  penaltyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  penaltyInfo: {},
  penaltyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  penaltyTextItem: {
    flexDirection: 'row',
  },
  mainText: {
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 8,
    fontWeight: '600',
  },
  subText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'normal',
  },
});
