import { createStore, createTypedHooks } from 'easy-peasy';

import { RootState } from './../models';
import { LoginStore } from './LoginStore';

export const store: RootState = {
  loginStore: LoginStore,
};

export default createStore(store, {
  injections: {},
});

const typedHooks = createTypedHooks<RootState>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
