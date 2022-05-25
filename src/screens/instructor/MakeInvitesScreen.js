import {
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import axios, {baseURL} from '../../../config/axios';
import {useMainContext} from '../../../context/MainContextProvider';
import {COLORS} from '../../../utils/colors';
import Modal from 'react-native-modal';
import ModalSuccess from '../../components/ModalSuccess';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MakeInvitesScreen = ({route}) => {
  const [result, setResult] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [fileLabel, setFileLabel] = useState('Choose a .csv file');
  const [message, setMessage] = useState('');
  const {token, fetchInstructorEvents} = useMainContext();
  const {id} = route.params;

  useEffect(() => {
    if (result) {
      setFileLabel(result.name);
    } else {
      setFileLabel('Choose a .csv file');
    }
  }, [result]);

  const close = () => {
    setIsVisible(false);
  };
  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.log('cancelled');
    } else if (isInProgress(err)) {
      console.log(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const handleSubmit = async () => {
    if (!result) {
      ToastAndroid.show(
        'No file selected, please select a file to upload',
        ToastAndroid.SHORT,
      );
      return;
    }
    let formData = new FormData();
    formData.append('file', {
      uri: result?.uri,
      type: result?.type,
      name: result?.name,
    });

    try {
      const res = await axios.post(
        `/api/instructor/create_invites_csv/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          transformRequest: (data, headers) => {
            return formData;
          },
        },
      );
      if (res.data?.success) {
        fetchInstructorEvents();
        setMessage(res.data?.message);
        setIsVisible(true);
      }
    } catch (error) {
      console.log(`${error} at editVaccine`);
    }
  };

  const chooseDocument = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setResult(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <View style={styles.container}>
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
        <FontAwesome5
          name="file-upload"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
        <TouchableOpacity onPress={chooseDocument}>
          <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
            {fileLabel}
          </Text>
        </TouchableOpacity>
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
            Submit
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
        <ModalSuccess message={message} />
      </Modal>
    </View>
  );
};

export default MakeInvitesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
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
