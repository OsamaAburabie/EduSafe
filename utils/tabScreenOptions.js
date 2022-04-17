import {COLORS} from './colors';

export const tabScreenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderTopColor: 'transparent',
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    marginBottom: 10,
    fontSize: 11,
  },

  tabBarIconStyle: {
    alignItems: 'center',
    marginBottom: -12,
  },

  tabBarActiveTintColor: COLORS.white,
  tabBarInactiveTintColor: COLORS.lightWhite,
};
