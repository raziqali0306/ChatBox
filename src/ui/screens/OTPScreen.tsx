import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {get} from './../../common/Api';

const OTPScreen = ({navigation}) => {
  const confirmation: FirebaseAuthTypes.ConfirmationResult = navigation.getParam(
    'confirmation',
  );

  const listenAuthStateChange = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const url = `http://192.168.0.110:3000/users/${user.uid}`;
        try {
          const response = await get(url);
          if (!response.userExists) {
            navigation.navigate('NameInputScreen', {
              user: user,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    listenAuthStateChange();
  }, []);

  const login = async (code: string) => {
    await confirmation.confirm(code);
  };

  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.backbutton}>{/* backbutton */}</View>
      <View style={styles.headerText}>
        <Text style={styles.textStyle}>Enter OTP</Text>
        <Text style={{fontSize: 10, color: 'grey'}}>
          Enter the one time password sent to{' +91'}
          {navigation.getParam('phoneNumber')}
        </Text>
      </View>
      <View style={styles.otpArea}>
        <OTPInputView
          codeInputFieldStyle={styles.otpFeildArea}
          style={{width: '100%', height: 100}}
          pinCount={6}
          onCodeFilled={(code) => {
            login(code);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backbutton: {
    height: 40,
  },
  headerText: {
    marginHorizontal: 20,
  },
  otpArea: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
  },
  otpFeildArea: {
    color: 'black',
    borderColor: 'black',
    height: 45,
  },
  textStyle: {
    fontSize: 26,
    fontFamily: 'bold',
  },
});

export default OTPScreen;
