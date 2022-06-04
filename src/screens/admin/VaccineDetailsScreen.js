import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../utils/colors';
import axios from '../../../config/axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

const VaccineDetailsScreen = ({navigation, route}) => {
  const initialAvatar = {
    path: route.params?.image,
  };

  console.log(route.params?.id);

  const [avatar, setAvatar] = useState(initialAvatar);

  const acceptVaccine = async () => {
    try {
      const res = await axios.put(`/api/admin/vaccines/${route.params?.id}`, {
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
      const res = await axios.put(`/api/admin/vaccines/${route.params?.id}`, {
        status: 'rejected',
      });
      if (res.data?.success) {
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Image
        source={{uri: avatar?.path}}
        style={[
          styles.avatar,
          {
            resizeMode: 'contain',
          },
        ]}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
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
          <MaterialCommunityIcons name="check" size={30} color={COLORS.white} />
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
          <MaterialCommunityIcons name="close" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
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
