// Redux general
import { createStore, applyMiddleware } from 'redux';

// Redux Logger
import logger from 'redux-logger';

// Redux Saga
import createSagaMiddleware from 'redux-saga';

// Redux Persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

// Redux Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers and sagas
import rootSaga from './root.saga';
import { rootReducer, RootState } from './root.reducer';

// Enable Redux Dev Tools
const composeEnhancers = composeWithDevTools({});

// Redux Saga declaration
const sagaMiddleware = createSagaMiddleware();

// Persist configuration and setup
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'tenant', 'pages'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store // Workaround for PR https://github.com/rt2zz/redux-persist/pull/1085
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = createStore<RootState & PersistPartial, any, any, any>(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

// Run Redux Sagas
sagaMiddleware.run(rootSaga);

// persistor
export const persistor = persistStore(store);

export default store;
