import React from 'react';
import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n';

// import { BrowserRouter as Router } from 'react-router-dom';
import { Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { createBrowserHistory } from 'history';

// Router
export const history = createBrowserHistory();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router history={history}>
            <App />
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
