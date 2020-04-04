import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {User} from './../../common/Api';
import {useStoreState} from './../../stores';

const ChatScreen = (props: any) => {
  const user = useStoreState((state) => state.loginStore.currentLoggedInUser);
  const [searchText, setSearchText] = useState('');
  const contact: User = props.navigation.getParam('contact');

  const pressHandler = () => {};
  if (!contact) {
    return null;
  }
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.item}>
        <View style={styles.profileBox} />
        <View style={styles.userInfo}>
          <Text style={{fontSize: 14}}>{contact.name}</Text>
          <Text style={{fontSize: 10}}>{contact.phoneNumber}</Text>
        </View>
      </View>
      <View style={{flex: 1}} />
      <View style={styles.searchView}>
        <TextInput
          multiline
          value={searchText}
          placeholder={'Type a message..'}
          keyboardType={'default'}
          style={styles.searchBox}
          onChangeText={(text) => setSearchText(text)}
        />
        <Button title={'send'} onPress={pressHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  searchBox: {
    flex: 1,
    minHeight: 40,
    maxHeight: 60,
    width: 200,
    borderColor: '#F7F7F0',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 14,
    marginRight: 10,
  },
  item: {
    height: 56,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 2,
  },
  profileBox: {
    backgroundColor: '#F7F7F7',
    height: 40,
    width: 40,
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
  },
});

export default ChatScreen;
