import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/colors';
import axios from '../../../config/axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

const VaccineDetailsScreen = ({navigation, route}) => {
  const {id, status, image, User} = route.params;

  const acceptVaccine = async () => {
    try {
      const res = await axios.put(`/api/admin/vaccines/${id}`, {
        status: 'approved',
      });
      if (res.data?.success) {
        navigation.goBack();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const rejectVaccine = async () => {
    try {
      const res = await axios.put(`/api/admin/vaccines/${id}`, {
        status: 'rejected',
      });
      if (res.data?.success) {
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          elevation: 2,
          overflow: 'hidden',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}>
        <Image
          source={{
            uri: User?.avatar,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 20,
            }}>
            {User?.firstName} {User?.lastName}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {renderHeader()}
      <Image
        source={{uri: image}}
        style={[
          styles.avatar,
          {
            resizeMode: 'cover',
            borderRadius: 10,
          },
        ]}
      />
      {status === 'pending' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={acceptVaccine}
            style={[
              {
                backgroundColor: 'green',
                paddingVertical: 5,
                paddingHorizontal: 20,
              },
            ]}>
            <MaterialCommunityIcons
              name="check"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <View
            style={{
              width: 10,
            }}></View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={rejectVaccine}
            style={[
              {
                backgroundColor: 'red',
                paddingVertical: 5,
                paddingHorizontal: 20,
              },
            ]}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      )}

      {status === 'approved' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={rejectVaccine}
            style={[
              {
                backgroundColor: 'red',
                paddingVertical: 5,
                paddingHorizontal: 20,
              },
            ]}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      )}

      {status === 'rejected' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={acceptVaccine}
            style={[
              {
                backgroundColor: 'green',
                paddingVertical: 5,
                paddingHorizontal: 20,
              },
            ]}>
            <MaterialCommunityIcons
              name="check"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VaccineDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: '100%',
    height: 300,
  },

  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
