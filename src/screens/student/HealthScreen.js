import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/colors';
import {useMainContext} from '../../../context/MainContextProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from '../../../config/axios';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width;

const HealthScreen = ({navigation}) => {
  const {user, fetchUser, maskStatus, fetchMaskStatus} = useMainContext();
  const {vaccines} = user;
  // const [maskStatus, setMaskStatus] = React.useState('optional');
  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const close = () => {
    setIsVisible(false);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchUser();
    fetchMaskStatus();
    setRefreshing(false);
  }, []);

  const maksColor = maskStatus => {
    if (maskStatus === 'mandatory') {
      return '#d40000';
    } else if (maskStatus === 'recommended') {
      return 'orange';
    } else {
      return 'green';
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          elevation: 2,
          overflow: 'hidden',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}>
        <Image
          source={{
            uri: user?.avatar,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 20,
            }}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
      </View>
    );
  }

  function renderMaskStatus() {
    return (
      <View
        style={{
          backgroundColor: maksColor(maskStatus),
          elevation: 2,
          overflow: 'hidden',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}>
        <MaterialCommunityIcons
          name="face-mask"
          size={50}
          color={COLORS.white}
        />

        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: -10,
            textTransform: 'capitalize',
          }}>
          {maskStatus}
        </Text>
      </View>
    );
  }

  function renderVaccine() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          elevation: 2,
          overflow: 'hidden',
          padding: 10,
          borderRadius: 10,
          flex: 1,
        }}>
        {!vaccines?.length && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="emoticon-sad"
              size={100}
              color={COLORS.primary}
            />
            <View>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                You dont have any vaccines
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UploadVaccine')}>
                <Text
                  style={{
                    color: COLORS.gray,
                    fontSize: 16,
                  }}>
                  Upload vaccine
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {vaccines?.length > 0 && (
          <View
            style={{
              flex: 1,
            }}>
            {vaccines[0]?.status === 'pending' && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="timer-sand"
                  size={100}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 20,
                  }}>
                  Your vaccine is pending approval
                </Text>
              </View>
            )}
            {vaccines[0]?.status === 'approved' && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={100}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 20,
                  }}>
                  Your vaccine is approved
                </Text>
              </View>
            )}
            {vaccines[0]?.status === 'rejected' && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name="warning" size={100} color={'red'} />
                <Text
                  style={{
                    color: 'red',
                    fontSize: 20,
                  }}>
                  Your vaccine is rejected
                </Text>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={{
                  height: 100,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="eye" size={45} color={COLORS.primary} />
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 18,
                    }}>
                    View Vaccine
                  </Text>
                </View>
              </TouchableOpacity>
              {/* line devider */}
              <View
                style={{
                  height: 100,
                  width: 1,
                  backgroundColor: COLORS.lightGray,
                }}></View>
              {/* line devider end */}
              {vaccines[0]?.status !== 'approved' && (
                <TouchableOpacity
                  style={{
                    height: 100,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('EditVaccine', {
                      vaccine: vaccines[0],
                    })
                  }>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesome name="edit" size={45} color={COLORS.primary} />
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontSize: 18,
                      }}>
                      Edit Vaccine
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }

  function renderModal() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          height: 300,
          width: width - 20,
        }}>
        <Image
          source={{uri: vaccines[0]?.image}}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 10,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={COLORS.white}
          colors={[COLORS.primary]}
        />
      }>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {/* Header */}
      {renderHeader()}
      {/* Mask Status */}
      {renderMaskStatus()}
      {/* Vaccine */}
      {renderVaccine()}

      {/* Modal */}
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        // animationIn="fadeIn"
        // animationOut="fadeOut"
        onBackdropPress={close}
        backdropOpacity={0.7}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {renderModal()}
      </Modal>
    </ScrollView>
  );
};

export default HealthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
