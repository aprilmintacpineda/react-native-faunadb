import { initializeStore } from 'fluxible-js';
import RNSInfo from 'react-native-sensitive-info';

const entryKey = 'client_only_app';

const options = {
  sharedPreferencesName: entryKey,
  keychainService: entryKey
};

initializeStore({
  initialStore: {
    token: null,
    user: null
  },
  persist: {
    useJSON: false,
    asyncStorage: {
      setItem: (key, value) => RNSInfo.setItem(key, value, options),
      getItem: async key => RNSInfo.getItem(key, options)
    },
    restore: savedStore => ({
      token: savedStore.token
    })
  }
});
