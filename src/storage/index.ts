import AsyncStorage  from "@react-native-community/async-storage";
import { User } from "./../common/Api";

const LOGGED_IN_USER_KEY = 'loggedInUserKey'



class Storage {
    async getLoggedInUser(): Promise<User | null> {
        try {
            const response = await AsyncStorage.getItem(LOGGED_IN_USER_KEY)
            if (response) {
                return JSON.parse(response)
            }
            return null
        } catch (error) {
            return null
        }
    }

    async setLoggedInUser(user: User): Promise<boolean> {
        try {
            await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user))
            return true
        } catch(error) {
            return false
        }
    }
}

const storage = new Storage()

export default storage