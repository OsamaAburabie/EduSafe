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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMainContext} from '../../../context/MainContextProvider';
import ImagePicker from 'react-native-image-crop-picker';
import {baseURL} from '../../../config/axios';

const width = Dimensions.get('window').width;

const UploadVaccine = ({navigation}) => {
  const {user, token, fetchUser} = useMainContext();
  const initialAvatar = {
    path: 'https://alrai.com/uploads/images/2021/03/30/276084.jpg',
  };
  const [avatar, setAvatar] = useState(initialAvatar);

  const submitEdit = async () => {
    let formData = new FormData();
    if (avatar.path !== initialAvatar.path) {
      formData.append('pic', {
        uri: avatar?.path,
        type: avatar?.mime,
        name: avatar?.path,
      });
    }

    try {
      let res = await fetch(`${baseURL}/api/student/vaccine`, {
        method: 'post',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      let responseJson = await res.json();
      if (!res.ok) {
        if (responseJson?.errors) {
          console.log(responseJson.errors);
        } else {
          return Promise.reject('Something went wrong');
        }
      }
      if (responseJson.success) {
        fetchUser();
        navigation.navigate('Health');
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        'Something went wrong, try again later',
        ToastAndroid.SHORT,
      );
    }
  };

  const openGalleryCrop = async () => {
    try {
      await ImagePicker.openPicker({
        cropping: true,
        compressImageQuality: 0.5,
      }).then(image => {
        setAvatar(image);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={openGalleryCrop}>
          <Image source={{uri: avatar?.path}} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          {
            backgroundColor: COLORS.white,
          },
        ]}>
        <>
          <View style={styles.button}>
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
        </>
      </View>
    </ScrollView>
  );
};

export default UploadVaccine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: width - 10,
    height: 300,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  button: {
    paddingHorizontal: 10,
  },
  btn: {
    flex: 1,
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
