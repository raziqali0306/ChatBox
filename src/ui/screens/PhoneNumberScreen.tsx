import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';

const PhoneNumberScreen = (props) => {
  useEffect(() => {
    try {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      }
    } catch (_) {}
  }, []);

  const [number, setNumber] = useState<string>('');

  const [shouldShowButton, setShouldShowButton] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const buttonHandler = async () => {
    setShouldShowButton(false);
    setShowLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(`+91 ${number}`);
    setShowLoading(false);
    props.navigation.navigate('OTPScreen', {
      phoneNumber: number,
      confirmation: confirmation,
    });
  };

  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.containerStyle}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Enter your mobile number to get started
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            maxLength={10}
            style={styles.textInput}
            value={number}
            keyboardType={'number-pad'}
            placeholder={'Enter Phone number'}
            onChangeText={(number) => {
              if (number.length <= 10) {
                if (number.length === 10) {
                  setShouldShowButton(true);
                } else {
                  setShouldShowButton(false);
                }
                setNumber(number);
              }
            }}
          />
        </View>
      </View>
      {shouldShowButton ? (
        <View style={styles.buttonView}>
          <Button title={'NEXT'} onPress={buttonHandler} />
        </View>
      ) : showLoading ? (
        <View style={{justifyContent: 'center', marginBottom: 20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    marginVertical: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    paddingHorizontal: 20,
  },
  textInput: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  buttonView: {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    marginVertical: 20,
  },
});

export default PhoneNumberScreen;
