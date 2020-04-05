import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import PhoneNumberScreen from './ui/screens/PhoneNumberScreen';
import OTPScreen from './ui/screens/OTPScreen';
import NameInputScreen from './ui/screens/NameInputScreen';
import HomeScreen from './ui/screens/HomeScreen';
import ChatScreen from './ui/screens/ChatScreen';
import AppInitialLoader from './ui/screens/AppInitialLoader';

const HomeNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    ChatScreen: {
      screen: ChatScreen,
    },
  },
  {headerMode: 'none'},
);

const LoginFlow = createStackNavigator(
  {
    PhoneNumberScreen: {
      screen: PhoneNumberScreen,
    },
    OTPScreen: {
      screen: OTPScreen,
    },
    NameInputScreen: {
      screen: NameInputScreen,
    },
  },
  {headerMode: 'none'},
);

const Router = createSwitchNavigator(
  {
    AppInitialLoader: {
      screen: AppInitialLoader,
    },
    Login: LoginFlow,
    Home: HomeNavigator,
  },
  {
    initialRouteName: 'AppInitialLoader',
  },
);

export default createAppContainer(Router);
