import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/colors';
import {useMainContext} from '../../../context/MainContextProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../../../config/axios';
const width = Dimensions.get('window').width;
const HealthScreen = ({navigation}) => {
  const {user} = useMainContext();

  const [maskStatus, setMaskStatus] = React.useState('optional');

  const getMaskStatus = async () => {
    const response = await axios.get('/api/mask');

    if (response.data) {
      // setMaskStatus('yes');
      setMaskStatus(response.data?.status);
    }
  };

  React.useEffect(() => {
    getMaskStatus();
  }, []);

  const maksColor = maskStatus => {
    if (maskStatus === 'mandatory') {
      return '#d40000';
    } else if (maskStatus === 'recommended') {
      return 'orange';
    } else {
      return COLORS.primary;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.studentCard}>
        <Image source={{uri: user?.avatar}} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <Text style={{color: '#333', fontWeight: '700'}}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={{color: '#333'}}>{user?.email}</Text>
        </View>
        <View style={styles.maskIconContainer}>
          <MaterialCommunityIcons
            name="face-mask"
            size={40}
            color={maksColor(maskStatus)}
          />
        </View>
      </View>

      <View
        style={[
          styles.imagePlaceholder,
          {
            borderWidth: user?.vaccinated ? 0 : 1,
          },
        ]}>
        {user?.vaccinated ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: user?.vaccines[0]?.image}}
              style={styles.vaccineImage}
            />
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {user?.vaccines ? (
              <>
                <MaterialCommunityIcons
                  name="timer-sand"
                  size={100}
                  color={COLORS.primary}
                />
              </>
            ) : (
              <>
                <AntDesign name="warning" size={100} color={COLORS.primary} />
              </>
            )}
            <Text
              style={{color: COLORS.primary, fontWeight: '500', fontSize: 18}}>
              {user?.vaccines
                ? 'Your vaccines is under review'
                : 'Upload your vaccines'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.btnContainer}>
        <Pressable
          onPress={() => navigation.navigate('UploadVaccine')}
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="upload" size={50} color={COLORS.white} />
        </Pressable>
      </View>
    </View>
  );
};

export default HealthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  studentCard: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
  },
  cardImage: {
    height: 60,
    width: 60,
  },
  cardInfo: {
    paddingLeft: 10,
  },
  imagePlaceholder: {
    flex: 1,
    // backgroundColor: COLORS.lightWhite,
    marginVertical: 10,
    borderColor: COLORS.primary,
    // borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  maskIconContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  vaccineImage: {
    width: width - 20,
    height: 300,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
