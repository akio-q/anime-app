import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './context/AuthContext';

import App from './components/app/App';
import store from './store';

import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
);

