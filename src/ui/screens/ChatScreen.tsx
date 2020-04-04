import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {User} from './../../common/Api';
import {useStoreState} from './../../stores';
import {Message} from 'src/models';
import {FlatList} from 'react-native-gesture-handler';
import {createConfigItem} from '@babel/core';

const ChatScreen = (props: any) => {
  const user = useStoreState((state) => state.loginStore.currentLoggedInUser);
  const [searchText, setSearchText] = useState('');

  const [messages, setMessages] = useState<Array<Message>>([
    {
      messageId: 'somemessge-one',
      senderId: 'senderId',
      recieverId: 'recieverId',
      text: 'hey! how are you',
      timestamp: '',
      seen: false,
    },
    {
      messageId: 'somemessge-two',
      senderId: 'recieverId',
      recieverId: 'senderId',
      text: 'message two',
      timestamp: '',
      seen: false,
    },
    {
      messageId: 'somemessge-three',
      senderId: 'senderId',
      recieverId: 'recieverId',
      text:
        'ooasdfasdfa adf asd fa sd fa sd fa sdf a sd fa sd f adfafa df asdfadfa ds f fasdf',
      timestamp: '',
      seen: false,
    },
    {
      messageId: 'somemessge-four',
      senderId: 'recieverId',
      recieverId: 'senderId',
      text: 'asdfasdfa sdf a sd fa sd f as df as d fa sd fa sdf ',
      timestamp: '',
      seen: false,
    },
  ]);
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
          <Text style={{fontSize: 14}}>{contact.name}}</Text>
          <Text style={{fontSize: 10}}>{contact.phoneNumber}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={messages}
          renderItem={({item}) => {
            return (
              <View
                style={
                  'senderId' === item.senderId
                    ? styles.sendersView
                    : styles.receiversView
                }>
                <Text
                  style={
                    'senderId' === item.senderId
                      ? styles.sendersText
                      : styles.receiversText
                  }>
                  {item.text}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => {
            return item.messageId;
          }}
          inverted
        />
      </View>
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
  sendersView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  receiversView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 5,
  },
  sendersText: {
    maxWidth: '70%',
    backgroundColor: '#1E90FF',
    color: 'white',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  receiversText: {
    maxWidth: '70%',
    backgroundColor: '#B0C4DE',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
});

export default ChatScreen;
