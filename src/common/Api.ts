export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

class Api {
  baseUrl: string = 'http://192.168.0.110:3000';

  async userExists(userId: string): Promise<boolean> {
    try {
      const userExists: boolean = await get(
        `${this.baseUrl}/user_exists/${userId}`,
      );
      return userExists;
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
        resolve(response);
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
