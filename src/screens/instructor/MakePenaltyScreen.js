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
import React, {useState} from 'react';
import {COLORS} from '../../../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMainContext} from '../../../context/MainContextProvider';
import {RadioButton} from 'react-native-paper';
const MakePenaltyScreen = ({navigation}) => {
  const {user} = useMainContext();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'First name must be at least 3 characters long')
      .max(50, 'First name must be less than 50 characters long')
      .required('First name is required'),
    lastName: Yup.string()
      .min(3, 'Last name must be at least 3 characters long')
      .max(50, 'First name must be less than 50 characters long')
      .required('Last name is required'),
  });

  const onSubmit = (values, actions) => {};

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
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            type: '',
          }}
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
              <View>
                <RadioButton.Group
                  onValueChange={handleChange('type')}
                  value={values.type}>
                  <RadioButton.Item
                    label="Late on class"
                    value="late"
                    color={COLORS.primary}
                  />
                  <RadioButton.Item
                    label="Smoking"
                    value="smoking"
                    color={COLORS.primary}
                  />
                  <RadioButton.Item
                    label="Not wearing a mask"
                    value="mask"
                    color={COLORS.primary}
                  />
                </RadioButton.Group>
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSubmit}
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
          )}
        </Formik>
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
