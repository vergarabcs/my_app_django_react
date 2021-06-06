import React from 'react';
import { Provider } from 'react-redux';
import { AppBar, AppContent, AppLayout } from '../styles/styles';
import WordFactory from './components/WordFactory';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import wfReducer from '../redux/wordFactory/reducer';

export const rootReducer = combineReducers({
  wfState: wfReducer
})

// Note: this API requires redux@>=3.1.0
export const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <AppLayout>
        <AppBar>
          Hello
        </AppBar>
        <AppContent>
          {/* <WSManager/> */}
          <WordFactory/>
        </AppContent>
      </AppLayout>
    </Provider>
  );
};

export default App;
