import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import {useMainContext} from '../../context/MainContextProvider';
import QRCode from 'react-native-qrcode-svg';

const ProfileScreen = ({navigation}) => {
  const {user} = useMainContext();

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
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('EditProfile')}>
            <View style={[styles.btn]}>
              <Text style={[styles.btnText]}>Edit Profile</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {/*  */}
      <View style={styles.sepertor}></View>
      {/*  */}

      <QRCode value={user?.id} color={COLORS.primary} size={300} />
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
    marginVertical: 50,
  },
});
