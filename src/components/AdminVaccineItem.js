import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
const AdminVaccineItem = ({id, status, image, User}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('VaccineDetails', {
          id,
          status,
          image,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: User?.avatar}}
            style={{width: 45, height: 45, borderRadius: 22.5}}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.primary,
            }}>
            {User?.firstName} {User?.lastName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AdminVaccineItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
