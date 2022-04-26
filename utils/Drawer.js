import {View, Text, Button, StyleSheet} from 'react-native';
import React, {forwardRef} from 'react';
import {DrawerLayoutAndroid} from 'react-native-gesture-handler';

const navigationView = () => (
  <View style={[styles.container, styles.navigationContainer]}>
    <Text style={styles.paragraph}>I'm in the Drawer!</Text>
    <Button title="Close drawer" onPress={() => ref.current.closeDrawer()} />
  </View>
);

const Drawer = forwardRef(({props, ref}) => {
  return (
    <DrawerLayoutAndroid
      ref={ref}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => (
        <View style={styles.container}>{navigationView()}</View>
      )}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the </Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button title="Open drawer" onPress={() => ref.current.openDrawer()} />
      </View>
    </DrawerLayoutAndroid>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
