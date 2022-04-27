import {
  SafeAreaView,
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
import React from 'react';
import {COLORS} from '../../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from '../../config/axios';
import {useStorage} from '../../hooks/UseStorage';
import {useMainContext} from '../../context/MainContextProvider';
const EditProfileScreen = ({navigation}) => {
  const {user, setUser} = useMainContext();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last Name is required'),
  });

  const Register = async (values, actions) => {
    let formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      let res = await fetch('http://192.168.1.67:5000/api/user/profile', {
        method: 'put',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      let responseJson = await res.json();
      if (responseJson.success) {
        setUser({
          ...user,
          ...responseJson.user,
        });

        Keyboard.dismiss();
        navigation.navigate('Profile');
      }
    } catch (err) {
      actions.setSubmitting(false);
      if (err?.response?.data?.errors) {
        err.response.data.errors.forEach(error => {
          actions.setFieldError(error.path[1], error.message);
        });
      } else {
        ToastAndroid.show(
          'Something went wrong, try again later',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const onSubmit = (values, actions) => {
    Register(values, actions);
  };

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
        <Formik
          validateOnChange={false}
          initialValues={{firstName: user?.firstName, lastName: user?.lastName}}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: COLORS.black,
                  },
                ]}>
                First Name
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color={COLORS.black} size={20} />
                <TextInput
                  placeholder="Your First Name"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: COLORS.black,
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
              </View>
              {/* Error msg */}
              {errors.firstName && touched.firstName ? (
                <View>
                  <Text style={styles.errorMsg}>{errors.firstName}</Text>
                </View>
              ) : null}
              {errors.general ? (
                <View>
                  <Text style={styles.errorMsg}>{errors.general}</Text>
                </View>
              ) : null}

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: COLORS.black,
                    marginTop: 35,
                  },
                ]}>
                Last Name
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color={COLORS.black} size={20} />
                <TextInput
                  placeholder="Your Last Name"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: COLORS.black,
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
              </View>
              {/* Error msg */}
              {errors.lastName && touched.lastName ? (
                <View>
                  <Text style={styles.errorMsg}>{errors.lastName}</Text>
                </View>
              ) : null}

              <View style={styles.button}>
                <TouchableOpacity
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                  style={[
                    styles.signIn,
                    {
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                      borderWidth: 1,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: COLORS.white,
                      },
                    ]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  footer: {
    flex: 3,
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
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
