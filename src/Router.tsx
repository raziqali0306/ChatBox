import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import PhoneNumberScreen from './ui/screens/PhoneNumberScreen';
import OTPScreen from './ui/screens/OTPScreen';
import NameInputScreen from './ui/screens/NameInputScreen';
import HomeScreen from './ui/screens/HomeScreen';
import ChatScreen from './ui/screens/ChatScreen';

const Router = createStackNavigator(
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
    HomeScreen: {
      screen: HomeScreen,
    },
    ChatScreen: {
      screen: ChatScreen,
    },
  },
  {headerMode: 'none'},
);

export default createAppContainer(Router);
