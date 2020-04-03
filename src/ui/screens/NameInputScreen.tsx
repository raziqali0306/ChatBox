import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
const NameInputScreen = (props) => {
  const [userName, setUserName] = useState<string>('');

  const [shouldShowButton, setShouldShowButton] = useState(false);

  const buttonHandler = () => {
    console.log('====process complete');
    // props.navigation.navigate('OTPScreen');
  };

  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.containerStyle}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Enter your Name</Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            value={userName}
            keyboardType={'name-phone-pad'}
            placeholder={'Enter your Name'}
            onChangeText={(text) => {
              if (text.length <= 16) {
                if (text.length > 5) {
                  setShouldShowButton(true);
                } else {
                  setShouldShowButton(false);
                }
                setUserName(text);
              }
            }}
          />
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

export default NameInputScreen;
