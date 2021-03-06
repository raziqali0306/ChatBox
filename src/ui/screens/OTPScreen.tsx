import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import Api from './../../common/Api';
import {useStoreActions} from './../../stores';

const OTPScreen = ({navigation}) => {
  const loginUser = useStoreActions((state) => state.loginStore.loginUser);
  const confirmation: FirebaseAuthTypes.ConfirmationResult = navigation.getParam(
    'confirmation',
  );
  const [loading, setLoading] = useState(false);

  const listenAuthStateChange = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userExists = await Api.userExists(user.uid);
        if (userExists) {
          const userInfo = await Api.getUserInfo(user.uid);
          if (userInfo) {
            loginUser(userInfo);
            setLoading(false);
            navigation.navigate('HomeScreen');
          }
        } else {
          setLoading(false);
          navigation.navigate('NameInputScreen', {
            user: user,
          });
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
            setLoading(true);
            login(code);
          }}
        />
        {loading ? (
          <View style={{justifyContent: 'center', marginTop: 100}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : null}
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
