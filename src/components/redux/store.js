import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './loginForm';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ChatSlice } from './chat-message';
import { cartSlice } from './cart';
import { ThemeSlice } from './dark-light-theme';
import { sidebarSlice } from './sidebar';

// Define the root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice.reducer,
  chat: ChatSlice.reducer,
  themeDart: ThemeSlice.reducer,
  sidebar: sidebarSlice.reducer
});

// Create the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'themeDart'], // persist only 'auth' and 'themeDart'
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

// Persist the store
persistStore(store);

// Export the store
export { store };
