import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import api, {User} from './../../common/Api';
import {useStoreActions} from './../../stores';

const NameInputScreen = (props: any) => {
  const [userName, setUserName] = useState<string>('');

  const loginUser = useStoreActions((state) => state.loginStore.loginUser);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const firebaseUser: FirebaseAuthTypes.User = props.navigation.getParam(
    'user',
  );
  const buttonHandler = async () => {
    const user: User = {
      id: firebaseUser.uid,
      name: userName,
      phoneNumber: firebaseUser.phonenumber ? firebaseUser.phonenumber : '',
      email: '',
    };
    const isUserSignedIn = await api.signUpUser(user);
    if (isUserSignedIn) {
      loginUser(user);
      props.navigation.navigate('HomeScreen');
    } else {
      // todo
    }
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
