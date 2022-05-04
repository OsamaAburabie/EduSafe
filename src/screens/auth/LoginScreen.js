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
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from '../../../config/axios';
import {useMainContext} from '../../../context/MainContextProvider';
const SignupScreen = ({navigation}) => {
  const [isPasswordVisable, setIsPasswordVisable] = React.useState(true);
  const {setUser, setToken} = useMainContext();
  const updateSecureTextEntry = () => {
    setIsPasswordVisable(prevState => !prevState);
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const Login = (values, actions) => {
    axios
      .post('/api/auth/login', values)
      .then(res => {
        if (res?.data?.success) {
          setUser(res?.data?.user);
          setToken(res?.data?.token);
        }
      })
      .catch(err => {
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
      });
  };

  const onSubmit = (values, actions) => {
    Login(values, actions);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.header}>
        <Image
          source={require('../../images/logo.png')}
          style={{height: 200, width: 200}}
        />
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: COLORS.white,
          },
        ]}>
        <Formik
          validateOnChange={false}
          initialValues={{password: '', email: ''}}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: COLORS.black,
                    marginTop: 35,
                  },
                ]}>
                Email
              </Text>
              <View style={styles.action}>
                <FontAwesome name="envelope-o" color={COLORS.black} size={20} />
                <TextInput
                  placeholder="Your Email"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: COLORS.black,
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>

              {/* Error msg */}
              {errors.email && touched.email ? (
                <View>
                  <Text style={styles.errorMsg}>{errors.email}</Text>
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
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={COLORS.black} size={20} />
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={isPasswordVisable ? true : false}
                  style={[
                    styles.textInput,
                    {
                      color: COLORS.black,
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {isPasswordVisable ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>

              {/* Error msg */}
              {errors.password && touched.password ? (
                <View>
                  <Text style={styles.errorMsg}>{errors.password}</Text>
                </View>
              ) : null}

              <TouchableOpacity>
                <Text style={{color: COLORS.primary, marginTop: 15}}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <TouchableOpacity
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
                    Sign In
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('SignupScreen')}
                  style={[
                    styles.signIn,
                    {
                      borderColor: COLORS.primary,
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: COLORS.primary,
                      },
                    ]}>
                    Sign Up
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

export default SignupScreen;

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
