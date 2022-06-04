import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS} from '../../../utils/colors';
import {useMainContext} from '../../../context/MainContextProvider';
import axios from '../../../config/axios';
import ProfileStats from '../../components/ProfileStats';
const ProfileScreen = ({navigation}) => {
  const {user, fetchUser, fetchPenalties} = useMainContext();
  const [selected, setSelected] = useState('qr');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUser();
    fetchPenalties();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={COLORS.white}
          colors={[COLORS.primary]}
        />
      }
      nestedScrollEnabled={true}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.profileInfoContainer}>
          <Image source={{uri: user?.avatar}} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.firstName} {user?.lastName}{' '}
              {user?.role !== 'instructor' ||
                ('guard' && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: user?.valuePoints >= 0 ? 'orange' : 'red',
                    }}>
                    ({user?.valuePoints} Points)
                  </Text>
                ))}
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
        <ProfileStats selected={selected} setSelected={setSelected} />
      </View>
    </ScrollView>
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
});
