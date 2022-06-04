import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import axios from '../../../config/axios';
import {COLORS} from '../../../utils/colors';
import AdminVaccineItem from '../../components/AdminVaccineItem';

const VaccinesScreen = () => {
  const [Vaccines, setVaccines] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState('pending');
  const [refreshing, setRefreshing] = React.useState(false);
  const filterVaccines = Vaccines.filter(vaccine => {
    if (filterStatus === 'pending') {
      return vaccine.status === 'pending';
    } else if (filterStatus === 'approved') {
      return vaccine.status === 'approved';
    } else if (filterStatus === 'rejected') {
      return vaccine.status === 'rejected';
    } else {
      return vaccine;
    }
  });

  const getVaccines = async () => {
    try {
      const res = await axios.get('/api/admin/vaccines');
      if (res.data.success) {
        setVaccines(res.data.vaccines);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getVaccines();
  }),
    [];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getVaccines();
    setRefreshing(false);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => setFilterStatus('pending')}
          style={{
            padding: 10,
            flex: 1,
            backgroundColor:
              filterStatus === 'pending' ? COLORS.white : COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: filterStatus === 'pending' ? COLORS.primary : COLORS.white,
              fontWeight: 'bold',
            }}>
            pending
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilterStatus('approved')}
          style={{
            padding: 10,
            flex: 1,
            backgroundColor:
              filterStatus === 'approved' ? COLORS.white : COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color:
                filterStatus === 'approved' ? COLORS.primary : COLORS.white,
              fontWeight: 'bold',
            }}>
            approved
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilterStatus('rejected')}
          style={{
            padding: 20,
            flex: 1,
            backgroundColor:
              filterStatus === 'rejected' ? COLORS.white : COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color:
                filterStatus === 'rejected' ? COLORS.primary : COLORS.white,
              fontWeight: 'bold',
            }}>
            rejected
          </Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={COLORS.white}
            colors={[COLORS.primary]}
          />
        }>
        {filterVaccines?.map(vaccine => (
          <AdminVaccineItem key={vaccine.id} {...vaccine} />
        ))}
      </ScrollView>
    </View>
  );
};

export default VaccinesScreen;

const styles = StyleSheet.create({});
