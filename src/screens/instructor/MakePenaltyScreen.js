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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMainContext} from '../../../context/MainContextProvider';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useFormik} from 'formik';
import axios from '../../../config/axios';
import {useFocusEffect} from '@react-navigation/native';

const MakePenaltyScreen = ({navigation, route}) => {
  // const {email} = route.params;
  const [email, setEmail] = useState('');

  const {user} = useMainContext();
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Student email is required'),
  });

  const sendRequest = async (values, actions) => {
    try {
      let res = await axios.post(
        `/api/instructor/give_penalty`,
        {
          studentEmail: values.email,
          type: values.type,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (res.data.success) {
        actions.resetForm();
      }

      ToastAndroid.show('Penalty created successfully', ToastAndroid.SHORT);
      console.log(res.data);
    } catch (err) {
      ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      type: 'late',
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      sendRequest(values, actions);
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.email) {
        formik.setFieldValue('email', route.params?.email);
        formik.setErrors({});
        route.params.email = '';
      }
    }, [route.params?.email]),
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View
        style={[
          styles.footer,
          {
            backgroundColor: COLORS.white,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: COLORS.black,
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={COLORS.black} size={20} />
          <TextInput
            placeholder="Student Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: COLORS.black,
              },
            ]}
            autoCapitalize="none"
            onChangeText={e => {
              formik.handleChange('email')(e);
            }}
            onBlur={e => {
              formik.handleBlur('email')(e);
            }}
            value={formik.values.email}
          />
        </View>
        {/* Error msg */}
        {formik.errors.email && formik.touched.email ? (
          <View>
            <Text style={styles.errorMsg}>{formik.errors.email} </Text>
          </View>
        ) : null}
        {formik.errors.general ? (
          <View>
            <Text style={styles.errorMsg}>{formik.errors.general}</Text>
          </View>
        ) : null}
        <TouchableOpacity onPress={() => navigation.navigate('ScanForEmail')}>
          <Text style={{color: COLORS.primary}}>Scan QR Instead?</Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.text_footer,
            {
              color: COLORS.black,
              marginTop: 35,
            },
          ]}>
          Penalty Type
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
          }}>
          <Picker
            selectedValue={formik.values.type}
            onValueChange={formik.handleChange('type')}
            placeholder="Select Penalty Type"
            mode="dropdown"
            // mode="dropdown"
            style={{
              marginLeft: -15,
              color: COLORS.black,
            }}
            dropdownIconRippleColor={'transparent'}>
            <Picker.Item label="Late on class" value="late" />
            <Picker.Item label="Smoking" value="smoking" />
            <Picker.Item label="Not wearing a mask" value="mask" />
          </Picker>
        </View>

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
      </View>
    </ScrollView>
  );
};

export default MakePenaltyScreen;

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
    width: 125,
    height: 125,
    borderRadius: 62.5,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
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
