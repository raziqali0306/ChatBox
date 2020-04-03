import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import PhoneNumberScreen from './ui/screens/PhoneNumberScreen';
import OTPScreen from './ui/screens/OTPScreen';
import NameInputScreen from './ui/screens/NameInputScreen';

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
  },
  {headerMode: 'none'},
);

export default createAppContainer(Router);
