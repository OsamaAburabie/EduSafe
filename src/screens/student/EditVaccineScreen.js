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
import {useMainContext} from '../../../context/MainContextProvider';
import ImagePicker from 'react-native-image-crop-picker';
import axios from '../../../config/axios';

const width = Dimensions.get('window').width;

const EditVaccie = ({navigation, route}) => {
  const {fetchUser} = useMainContext();
  const initialAvatar = {
    path: route.params?.vaccine?.image,
  };
  const [avatar, setAvatar] = useState(initialAvatar);

  const submitEdit = async () => {
    if (avatar.path === initialAvatar.path) {
      ToastAndroid.show('Please select an image', ToastAndroid.SHORT);
      return;
    }

    let formData = new FormData();
    formData.append('pic', {
      uri: avatar?.path,
      type: avatar?.mime,
      name: avatar?.path,
    });

    try {
      const res = await axios.put(
        `/api/student/vaccine/${route.params?.vaccine?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return formData;
          },
        },
      );
      if (res.data?.success) {
        fetchUser();
        navigation.goBack();
      }
    } catch (error) {
      console.log(`${error} at editVaccine`);
    }
  };

  const openGalleryCrop = async () => {
    try {
      await ImagePicker.openPicker({
        cropping: true,
        compressImageQuality: 0.5,
        height: 300,
      }).then(image => {
        setAvatar(image);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <TouchableOpacity onPress={openGalleryCrop}>
        <Image
          source={{uri: avatar?.path}}
          style={[
            styles.avatar,
            {
              resizeMode: 'contain',
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={submitEdit}
        style={[
          styles.btn,
          {
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primary,
            borderWidth: 1,
          },
        ]}>
        <Text
          style={[
            styles.textBtn,
            {
              color: COLORS.white,
            },
          ]}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditVaccie;

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
