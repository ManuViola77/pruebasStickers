import {createAppContainer} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from 'screens/MainScreen';
import EditImageScreen from 'screens/EditImageScreen';

const MainNavigator = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: () => ({
      title: 'Main Screen!!!',
    }),
  },

  EditImageScreen: {
    screen: EditImageScreen,
    navigationOptions: () => ({
      title: 'Edit Image Screen!!!',
    }),
  },
});

const AppNavigator = createAnimatedSwitchNavigator(
  {
    MainNavigator,
  },
  {
    initialRouteName: 'MainNavigator',
  },
);

export default createAppContainer(AppNavigator);
