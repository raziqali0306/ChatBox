import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
const PhoneNumberScreen = (props) => {
  const [number, setNumber] = useState<string>('');

  const [shouldShowButton, setShouldShowButton] = useState(false);

  const buttonHandler = () => {
    props.navigation.navigate('OTPScreen', {
      phoneNumber: number,
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
            style={styles.textInput}
            value={number}
            keyboardType={'numeric'}
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
          {console.log(number)}
        </View>
      </View>
      {shouldShowButton ? (
        <View style={styles.buttonView}>
          <Button title={'NEXT'} onPress={buttonHandler} />
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
    width: '100%',
    margin: 10,
    marginVertical: 20,
  },
});

export default PhoneNumberScreen;
