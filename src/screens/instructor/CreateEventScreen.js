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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMainContext} from '../../../context/MainContextProvider';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useFormik} from 'formik';
import axios from '../../../config/axios';
import {useFocusEffect} from '@react-navigation/native';

const CreateEventScreen = ({navigation, route}) => {
  const {user, token} = useMainContext();
  const SignupSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const sendRequest = async (values, actions) => {
    try {
      let res = await axios.post(
        `/api/instructor/give_penalty`,
        {
          studentEmail: values.title,
          type: values.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        actions.resetForm();
      }

      ToastAndroid.show('Penalty created successfully', ToastAndroid.SHORT);
      console.log(res.data);
    } catch (err) {
      ToastAndroid.show(
        err.response?.data?.message || 'Something went wrong',
        ToastAndroid.SHORT,
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      sendRequest(values, actions);
    },
  });

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Text
        style={[
          styles.text_footer,
          {
            color: COLORS.black,
          },
        ]}>
        Title
      </Text>
      <View style={styles.action}>
        <MaterialCommunityIcons
          name="format-title"
          color={COLORS.black}
          size={20}
        />
        <TextInput
          placeholder="Title"
          placeholderTextColor="#666666"
          style={[
            styles.textInput,
            {
              color: COLORS.black,
            },
          ]}
          autoCapitalize="none"
          onChangeText={formik.handleChange('title')}
          onBlur={formik.handleBlur('title')}
          value={formik.values.title}
        />
      </View>
      {/* Error msg */}
      {formik.errors.title && formik.touched.title ? (
        <View>
          <Text style={styles.errorMsg}>{formik.errors.title} </Text>
        </View>
      ) : null}
      {formik.errors.general ? (
        <View>
          <Text style={styles.errorMsg}>{formik.errors.general}</Text>
        </View>
      ) : null}
      <Text
        style={[
          styles.text_footer,
          {
            color: COLORS.black,
          },
        ]}>
        Description
      </Text>
      <View style={styles.action}>
        <MaterialCommunityIcons
          name="information-outline"
          color={COLORS.black}
          size={20}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#666666"
          style={[
            styles.textInput,
            {
              color: COLORS.black,
            },
          ]}
          autoCapitalize="none"
          onChangeText={formik.handleChange('description')}
          onBlur={formik.handleBlur('description')}
          value={formik.values.description}
        />
      </View>
      {/* Error msg */}
      {formik.errors.description && formik.touched.description ? (
        <View>
          <Text style={styles.errorMsg}>{formik.errors.description} </Text>
        </View>
      ) : null}
      {formik.errors.general ? (
        <View>
          <Text style={styles.errorMsg}>{formik.errors.general}</Text>
        </View>
      ) : null}

      <View style={styles.button}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={formik.handleSubmit}
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
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
  },

  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    width: '100%',
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
