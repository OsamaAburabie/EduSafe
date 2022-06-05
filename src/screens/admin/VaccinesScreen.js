import {
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import axios from '../../../config/axios';
import {COLORS} from '../../../utils/colors';
import AdminVaccineItem from '../../components/AdminVaccineItem';

const VaccinesScreen = ({navigation}) => {
  const [Vaccines, setVaccines] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState('pending');
  const [refreshing, setRefreshing] = React.useState(false);

  const status = ['pending', 'approved', 'rejected'];

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
    const unsubscribe = navigation.addListener('focus', () => {
      getVaccines();
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getVaccines();
    setRefreshing(false);
  }, []);

  const EmptyListMessage = ({item}) => {
    return (
      <View style={styles.emptyListStyle}>
        <Text style={styles.emptyText}>No {filterStatus} vaccines</Text>
      </View>
    );
  };

  const calcBackgroundColor = status => {
    if (status === 'pending') {
      return 'orange';
    } else if (status === 'approved') {
      return 'green';
    } else {
      return 'red';
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}>
        {status.map((sts, index) => (
          <Pressable
            key={index}
            onPress={() => setFilterStatus(sts)}
            style={{
              padding: 10,
              flex: 1,
              backgroundColor:
                filterStatus === sts ? COLORS.white : calcBackgroundColor(sts),
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
                fontSize: 18,
                textTransform: 'capitalize',
                fontWeight: filterStatus === sts ? '500' : 'normal',
              }}>
              {sts}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={Vaccines.filter(vaccine => {
          return vaccine.status === filterStatus;
        })}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => <AdminVaccineItem key={item.id} {...item} />}
        ListEmptyComponent={EmptyListMessage}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={COLORS.white}
            colors={[COLORS.primary]}
          />
        }
      />
    </View>
  );
};

export default VaccinesScreen;

const styles = StyleSheet.create({
  emptyListStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.primary,
  },
});
