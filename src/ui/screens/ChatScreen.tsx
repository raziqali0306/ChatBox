/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import api, {User} from './../../common/Api';
import {useStoreState} from './../../stores';
import {Message} from 'src/models';
import {FlatList} from 'react-native-gesture-handler';

const ChatScreen = (props: any) => {
  const user = useStoreState((state) => state.loginStore.currentLoggedInUser);
  const [messageText, setMessageText] = useState('');

  const [messages, setMessages] = useState<Array<Message>>([]);

  const getMessages = async () => {
    if (user) {
      const arrayOfMessages = await api.getAllMessagesOfChat(
        user!.id,
        contact.id,
      );
      setMessages(arrayOfMessages);
    }
  };
  useEffect(() => {
    getMessages();
    setInterval(() => {
      if (user) {
        api.getMessageCountOfChat(user!.id, contact.id).then((count) => {
          if (count > messages.length) {
            getMessages();
          }
        });
      }
    }, 2000);
  }, []);

  const contact: User = props.navigation.getParam('contact');

  const pressHandler = () => {
    if (user && contact) {
      api.sendMessage(user.id, contact.id, messageText).then((res) => {
        if (res) {
          setMessages((currentMessages) => [res, ...currentMessages]);
          setMessageText('');
        } else {
          setMessageText('');
        }
      });
    }
  };
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
      <View style={{flex: 1}}>
        <FlatList
          data={messages}
          renderItem={({item}) => {
            return (
              <View
                style={
                  user && item.sender_id === user.id
                    ? {...styles.messageView, justifyContent: 'flex-end'}
                    : {...styles.messageView, justifyContent: 'flex-start'}
                }>
                <Text
                  style={
                    user && item.sender_id === user.id
                      ? {
                          ...styles.messageStyle,
                          backgroundColor: '#1E90FF',
                          color: 'white',
                        }
                      : {...styles.messageStyle, backgroundColor: '#B0C4DE'}
                  }>
                  {item.text}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => {
            return item.message_id;
          }}
          inverted
        />
      </View>
      <View style={styles.searchView}>
        <TextInput
          multiline
          value={messageText}
          placeholder={'Type a message..'}
          keyboardType={'default'}
          style={styles.searchBox}
          onChangeText={(text) => setMessageText(text)}
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
  messageView: {
    flexDirection: 'row',
    margin: 5,
  },
  messageStyle: {
    maxWidth: '70%',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
});

export default ChatScreen;
