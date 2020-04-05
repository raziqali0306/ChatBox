import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import api, {User} from './../../common/Api';
import contacts from './../../common/Contacts';

const ContactScreen = (props) => {
  const [searchText, setSearchText] = useState('');
  const [usersList, setUserList] = useState<Array<User>>([]);
  const [loading, SetLoading] = useState(false);
  const pressHandler = async () => {
    if (!searchText) {
      return;
    }
    // const response = await api.searchUsers(searchText);
    // if (response) {
    //   setUserList(response);
    // }
  };

  const contactToUsersConverter = (contact: any): User[] => {
    let users: User[] = [];

    contact.phoneNumbers.map((item: any) => {
      const user: User = {
        id: `${contact.identifier}_${item.value}`,
        name: contact.displayName,
        phonenumber: item.value,
        email: '',
      };
      users.push(user);
    });

    return users;
  };

  const contactsToUsersConverter = (contacts: Array<any>): Array<User> => {
    let users: User[] = [];
    contacts.map((contact) => {
      users = [...users, ...contactToUsersConverter(contact)];
    });
    return users;
  };

  const getAllUsers = async () => {
    const response = await contacts.getContacts(0);
    console.log('false');
    const filteredContactList = contactsToUsersConverter(response).filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) => t.id === item.id || t.phonenumber === item.phonenumber,
        ),
    );

    setUserList(filteredContactList);
    SetLoading(false);
  };

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      getAllUsers();
    }, 1000);
  }, []);

  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.searchView}>
        <TextInput
          value={searchText}
          placeholder={'Name or number..'}
          keyboardType={'default'}
          style={styles.searchBox}
          onChangeText={(text) => setSearchText(text)}
        />
        <Button title={'SEARCH'} onPress={pressHandler} />
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={usersList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    props.navigation.navigate('ChatScreen', {
                      contact: item,
                    });
                  }}>
                  <View style={styles.profileBox} />
                  <View style={styles.userInfo}>
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                    <Text style={{fontSize: 12}}>{item.phonenumber}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => {
              return item.phonenumber;
            }}
          />
        </View>
      )}
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
  },
  searchBox: {
    flex: 1,
    height: 48,
    width: 200,
    borderColor: '#F7F7F7',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  item: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: '#00000033',
    borderBottomWidth: 1,
  },
  profileBox: {
    backgroundColor: '#F7F7F7',
    height: 50,
    width: 50,
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
});

export default ContactScreen;
