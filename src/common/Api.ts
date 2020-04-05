import {v4 as uuid} from 'uuid';
import {Message} from 'src/models';
import { NativeModules } from 'react-native';


interface AppConfig {
  serverUrl: string
}

interface AppConfigModule {
  config: () => Promise<AppConfig | null | undefined>
}

const appConfigModule: AppConfigModule = NativeModules.AppConfigModule;
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

interface SendMessageBody {
  id: string;
  userId: string;
  friendId: string;
  message: string;
}
class Api {
  baseUrl: string = 'http://192.168.0.110:5000';
  constructor() {
    appConfigModule.config().then(config => {
      console.log("==== config ", config)
      if (config) {
        this.baseUrl = config.serverUrl
      }
    })
  }

  async getUserInfo(userId: string): Promise<User | null> {
    try {
      const user = await get(`${this.baseUrl}/users/${userId}`);
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }

  async userExists(userId: string): Promise<boolean> {
    try {
      const response: {userExists: boolean} = await get(
        `${this.baseUrl}/user_exists/${userId}`,
      );
      return response.userExists;
    } catch (error) {
      return false;
    }
  }

  async searchUsers(text: string): Promise<Array<User>> {
    try {
      const searchResult = await get(`${this.baseUrl}/users/search/${text}`);
      return searchResult;
    } catch (error) {
      return [];
    }
  }

  async getAllUsers(): Promise<Array<User>> {
    try {
      const searchResult = await get(`${this.baseUrl}/users`);
      return searchResult;
    } catch (error) {
      return [];
    }
  }

  async signUpUser(body: User): Promise<boolean> {
    try {
      const response = await post(`${this.baseUrl}/sign_up`, body);
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async sendMessage(
    userId: string,
    toUserId: string,
    message: string,
  ): Promise<Message | null> {
    try {
      const messageId = uuid();
      const body: SendMessageBody = {
        id: messageId,
        userId: userId,
        friendId: toUserId,
        message: message,
      };
      const response = await post(`${this.baseUrl}/send_message`, body);
      if (response) {
        return {
          message_id: messageId,
          sender_id: userId,
          reciever_id: toUserId,
          text: message,
          timestamp: '',
        } as Message;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  async getAllMessagesOfChat(
    uid: string,
    friendUId: string,
  ): Promise<Array<Message>> {
    try {
      const arrayOfMessages = await post(`${this.baseUrl}/messages`, {
        friendId: friendUId,
        userId: uid,
      });
      return arrayOfMessages;
    } catch (error) {
      return [];
    }
  }

  async getMessageCountOfChat(uid: string, friendUId: string): Promise<number> {
    try {
      const response = await post(`${this.baseUrl}/messages_count`, {
        friendId: friendUId,
        userId: uid,
      });
      return response.messages_count;
    } catch (error) {
      return 0;
    }
  }
}

const api = new Api();

export default api;

const post = (url: string, body: object): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const get = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
