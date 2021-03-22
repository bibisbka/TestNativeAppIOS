import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './redux/reduxStore';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
