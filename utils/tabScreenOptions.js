import {COLORS} from './colors';

export const tabScreenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: COLORS.white,
    height: 60,
    borderTopColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabelStyle: {
    marginBottom: 10,
    fontSize: 11,
  },

  tabBarIconStyle: {
    alignItems: 'center',
    marginBottom: -12,
  },

  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: COLORS.primary,
};
