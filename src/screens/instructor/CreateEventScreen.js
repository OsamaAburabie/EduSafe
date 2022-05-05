import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Yup from 'yup';
import {useMainContext} from '../../../context/MainContextProvider';
import {useFormik} from 'formik';
import axios from '../../../config/axios';

import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/InputField';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import DefaultModalContent from '../../../utils/DefaultModalContent';
import ModalSuccess from '../../components/ModalSuccess';

const CreateEventScreen = ({navigation, route}) => {
  const {token} = useMainContext();
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState(dayjs().format('MMM D, h:mm A'));
  const [isVisible, setIsVisible] = useState(false);

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    date: Yup.string().required('Date is required'),
  });

  const sendRequest = async (values, actions) => {
    try {
      let res = await axios.post(`/api/instructor/create_event`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setIsVisible(true);
        actions.resetForm();
      }
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
      valuePoint: '10',
      date: new Date(),
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      Keyboard.dismiss();
      sendRequest(values, actions);
    },
  });
  const close = () => {
    setIsVisible(false);
  };
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <InputField
        label="Title"
        icon={
          <MaterialCommunityIcons
            name="format-title"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        value={formik.values.title}
        onChangeText={formik.handleChange('title')}
        error={formik.errors.title}
      />
      <InputField
        label="Description"
        icon={
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        value={formik.values.description}
        onChangeText={formik.handleChange('description')}
        error={formik.errors.description}
      />
      <InputField
        label="Value Points"
        icon={
          <EvilIcons
            name="sc-vimeo"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
        keyboardType="number-pad"
        value={formik.values.valuePoint}
        onChangeText={formik.handleChange('valuePoint')}
        error={formik.errors.valuePoint}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#f2f2f2',
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 25,
          flexWrap: 'wrap',
        }}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
            {dobLabel}
          </Text>
        </TouchableOpacity>

        {formik.errors.date && (
          <View style={{width: '100%'}}>
            <Text style={{color: '#FF0000', fontSize: 14}}>
              {formik.errors.date}{' '}
            </Text>
          </View>
        )}
      </View>
      <DatePicker
        modal
        open={open}
        date={formik.values.date}
        mode={'datetime'}
        onConfirm={date => {
          setOpen(false);
          formik.setFieldValue('date', date);
          setDobLabel(dayjs(date).format('MMM D, h:mm A'));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        testID={'modal'}
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        onBackdropPress={close}
        backdropOpacity={0.7}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        style={styles.view}>
        <ModalSuccess />
      </Modal>
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
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    alignItems: 'center',
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
