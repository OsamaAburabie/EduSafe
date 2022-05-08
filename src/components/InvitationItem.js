import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const InvitationItem = ({id, joining, seen, user}) => {
  const {firstName, lastName, email, avatar} = user;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: avatar}}
            style={{width: 45, height: 45, borderRadius: 22.5}}
          />

          {joining && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COLORS.primary,
                position: 'absolute',
                bottom: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="check"
                size={10}
                color={COLORS.white}
              />
            </View>
          )}
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 18,
              //   fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {firstName} {lastName}
          </Text>
        </View>
      </View>

      <View>
        {seen ? (
          <MaterialCommunityIcons name="eye" size={20} color={COLORS.primary} />
        ) : (
          <MaterialCommunityIcons name="eye-off" size={20} color="red" />
        )}
      </View>
    </View>
  );
};

export default InvitationItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
