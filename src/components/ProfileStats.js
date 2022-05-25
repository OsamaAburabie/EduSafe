import {Pressable, StyleSheet, Text, ScrollView, View} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMainContext} from '../../context/MainContextProvider';
import PenaltyItem from './PenaltyItem';

const ProfileStats = ({selected, setSelected}) => {
  const {user, penalties} = useMainContext();
  const penaltiesLength = penalties?.penalties?.length;

  return (
    <View style={styles.profileStats}>
      <View style={styles.statButtons}>
        {user?.role !== 'instructor' && (
          <Pressable
            onPress={() => setSelected('penalties')}
            style={[
              styles.statbtn,
              {
                backgroundColor:
                  selected === 'penalties' ? COLORS.primary : COLORS.white,
                borderColor:
                  selected === 'penalties' ? COLORS.white : COLORS.primary,
                borderWidth: selected === 'penalties' ? 0 : 1,
              },
            ]}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={22}
              color={selected === 'penalties' ? COLORS.white : COLORS.primary}
            />
            <Text
              style={[
                styles.statbtnText,
                {
                  color:
                    selected === 'penalties' ? COLORS.white : COLORS.primary,
                },
              ]}>
              Penalties
            </Text>
          </Pressable>
        )}
        {/* separator */}
        <View style={{width: 2}}></View>
        <Pressable
          onPress={() => setSelected('qr')}
          style={[
            styles.statbtn,
            {
              backgroundColor:
                selected === 'qr' ? COLORS.primary : COLORS.white,
              borderColor: selected === 'qr' ? COLORS.white : COLORS.primary,
              borderWidth: selected === 'qr' ? 0 : 1,
            },
          ]}>
          <MaterialCommunityIcons
            name="qrcode"
            size={22}
            color={selected === 'qr' ? COLORS.white : COLORS.primary}
          />
          <Text
            style={[
              styles.statbtnText,
              {
                color: selected === 'qr' ? COLORS.white : COLORS.primary,
              },
            ]}>
            QR Code
          </Text>
        </Pressable>
      </View>
      <View style={styles.statContainer}>
        {selected === 'penalties' && (
          <>
            {penaltiesLength ? (
              <View style={{width: '100%', flex: 1}}>
                {penalties?.penalties.map(penalty => (
                  <PenaltyItem key={penalty?.id} {...penalty} />
                ))}
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{fontSize: 18, color: COLORS.primary, marginRight: 2}}>
                  No Penalties
                </Text>
                <MaterialCommunityIcons
                  name="hand-clap"
                  size={22}
                  color={selected === 'qr' ? COLORS.white : COLORS.primary}
                />
              </View>
            )}
          </>
        )}

        {selected === 'qr' && (
          <QRCode value={user?.id} color={COLORS.primary} size={300} />
        )}
      </View>
    </View>
  );
};

export default ProfileStats;

const styles = StyleSheet.create({
  profileStats: {
    flex: 2,
    width: '100%',
  },
  statButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statbtn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statbtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  statContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 20,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
