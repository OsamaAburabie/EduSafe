import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/colors';
import {useMainContext} from '../../context/MainContextProvider';
import QRCode from 'react-native-qrcode-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({navigation}) => {
  const {user} = useMainContext();
  const [selected, setSelected] = useState('qr');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.profileInfoContainer}>
        <Image source={{uri: user?.avatar}} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <Pressable
            style={[styles.btn]}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={[styles.btnText]}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>
      {/*  */}
      <View style={styles.sepertor}></View>
      {/* ================================================================ */}

      <View style={styles.profileStats}>
        <View style={styles.statButtons}>
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
            <ScrollView style={{flex: 1, width: '100%'}}>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, color: COLORS.primary}}>
                  Penalty
                </Text>
              </View>
            </ScrollView>
          )}

          {selected === 'qr' && (
            <QRCode value={user?.id} color={COLORS.primary} size={300} />
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
    alignItems: 'center',
  },
  profileInfoContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  profileEmail: {
    fontSize: 15,
    color: COLORS.gray,
  },
  btn: {
    height: 30,
    width: 125,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 10,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sepertor: {
    height: 1,
    width: '75%',
    backgroundColor: COLORS.lightWhite,
    marginVertical: 20,
  },

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
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
