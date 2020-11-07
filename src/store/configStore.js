import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AppReducer from '../reducers/AppReducer'
import { createTransform } from 'redux-persist';
import { stringify, parse } from 'flatted';

const initialState = {};

export const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
)

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  keyPrefix: '', 
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'subjectStudyMetaData',
    'subjectVisitForm',
    'field',
    'visitForm',
    'language',
    'crfData',
    'chat',
    'deviceLocation'
    
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    
    // 'subject'
  ],
  transforms: [transformCircular]
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

const middleware = [thunk];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
);

const store = createStore(persistedReducer, initialState, composedEnhancers);

let persistor = persistStore(store);

export {
  store,
  persistor,
};

