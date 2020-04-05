import { User } from "./../common/Api";
import { Thunk, Action } from "easy-peasy";

export interface Message {
    message_id: string
    sender_id: string,
    reciever_id: string,
    text: string,
    timestamp: string,
    seen: boolean
}

export interface RootState {
    loginStore: LoginStoreState;
}

export interface LoginStoreState {
    currentLoggedInUser: User | null,
    loginUser: Thunk<LoginStoreState, {}, {}, RootState>;
    setCurrentLoggedInUser: Action<LoginStoreState, User>;
}
  