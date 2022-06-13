import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useMainContext} from '../../../context/MainContextProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../utils/colors';
import axios from '../../../config/axios';

const MaskStatusScreen = () => {
  const status = ['recommended', 'mandatory', 'optional'];
  const {maskStatus, setMaskStatus} = useMainContext();
  const [filterStatus, setFilterStatus] = React.useState(maskStatus);
  const changeStatus = async status => {
    try {
      const res = await axios.put(`/api/admin/mask`, {
        status,
      });
      if (res.data) {
        setMaskStatus(status);
        setFilterStatus(status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const maksColor = maskStatus => {
    if (maskStatus === 'mandatory') {
      return '#d40000';
    } else if (maskStatus === 'recommended') {
      return 'orange';
    } else {
      return 'green';
    }
  };
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
          paddingVertical: 100,
        }}>
        <MaterialCommunityIcons
          name="face-mask"
          size={100}
          color={COLORS.white}
        />

        <Text
          style={{
            color: COLORS.white,
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: -10,
            textTransform: 'capitalize',
          }}>
          {maskStatus}
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderMaskStatus()}
      <View
        style={{
          flexDirection: 'row',

          paddingBottom: 10,
        }}>
        {status.map((sts, index) => (
          <Pressable
            key={index}
            onPress={() => changeStatus(sts)}
            style={{
              padding: 10,
              flex: 1,
              backgroundColor:
                filterStatus === sts ? COLORS.white : COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              marginRight: index === status.length - 1 ? 0 : 10,
              borderWidth: filterStatus === sts ? 1 : 0,
              borderColor: COLORS.primary,
            }}>
            <Text
              style={{
                color: filterStatus === sts ? COLORS.primary : COLORS.white,
                fontSize: 15,
                textTransform: 'capitalize',
                fontWeight: filterStatus === sts ? '500' : 'normal',
              }}>
              {sts}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MaskStatusScreen;

const styles = StyleSheet.create({});
