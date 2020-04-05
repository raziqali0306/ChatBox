import { LoginStoreState } from "src/models";
import { thunk, action } from "easy-peasy";
import { User } from "./../common/Api";
import storage from "./../storage";

export const LoginStore: LoginStoreState = {
    currentLoggedInUser: null,
    loginUser: thunk(async (loginActions, _payload, {}) => {
        const user = {..._payload}
        loginActions.setCurrentLoggedInUser(user as User)
    }),
    setCurrentLoggedInUser: action((state, user) => {
        storage.setLoggedInUser(user)
        state.currentLoggedInUser = user
    }),
};
  