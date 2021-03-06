/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import api, {User} from './../../common/Api';
import {useStoreState} from './../../stores';
import {Message} from 'src/models';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

const ChatScreen = (props: any) => {
  const user = useStoreState((state) => state.loginStore.currentLoggedInUser);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Array<Message>>([]);

  const getMessages = async () => {
    if (user) {
      const arrayOfMessages = await api.getAllMessagesOfChat(
        user!.id,
        contact.id,
      );
      console.log(user);
      setMessages(arrayOfMessages);

      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getMessages();
    const timer = setInterval(() => {
      if (user) {
        api.getMessageCountOfChat(user!.id, contact.id).then((count) => {
          if (count > messages.length) {
            getMessages();
          }
        });
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
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
          <Text style={{fontSize: 10}}>{contact.phonenumber}</Text>
        </View>
      </View>
      {!loading ? (
        <View style={{flex: 1}}>
          <FlatList
            data={messages}
            renderItem={({item}) => {
              return (
                <View
                  style={
                    user && item.sender_id === user.id
                      ? {...styles.messageView, alignItems: 'flex-end'}
                      : {...styles.messageView, alignItems: 'flex-start'}
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
                  <Text style={{fontSize: 12, color: '#00000044'}}>
                    {moment(item.timestamp).hours()}:
                    {moment(item.timestamp).minutes()}
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
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
    elevation: 3,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 56,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
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
    margin: 5,
  },
  messageStyle: {
    maxWidth: '70%',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    fontSize: 13,
  },
});

export default ChatScreen;
