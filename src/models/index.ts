import { User } from "./../common/Api";
import { Thunk, Action } from "easy-peasy";

export interface RootState {
    loginStore: LoginStoreState;
}

export interface LoginStoreState {
    currentLoggedInUser: User | null,
    loginUser: Thunk<LoginStoreState, {}, {}, RootState>;
    setCurrentLoggedInUser: Action<LoginStoreState, User>;
}
  