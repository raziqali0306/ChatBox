import React from 'react';
import {View, Button, TextInput, Text, StyleSheet} from 'react-native';

const OTPScreen = ({navigation}) => {
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
      <View style={styles.OTPArea}></View>
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
  OTPArea: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
  },
  textStyle: {
    fontSize: 26,
    fontFamily: 'bold',
  },
});

export default OTPScreen;
