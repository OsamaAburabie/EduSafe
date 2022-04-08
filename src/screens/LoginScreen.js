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
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.header}>
        {/* <Text style={styles.text_header}>Welcome!</Text> */}
        <Image
          source={require('../images/logo.png')}
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
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: COLORS.black,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </View>
        )}

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
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: COLORS.black,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </View>
        )}

        <TouchableOpacity>
          <Text style={{color: COLORS.primary, marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            activeOpacity={0.8}
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
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

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
