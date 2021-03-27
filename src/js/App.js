import React from 'react';
import { hot } from 'react-hot-loader/root';

import Home from './pages/Home';
import SentryBoundary from './utils/SentryBoundary';

const App = () => {
  console.log('bill react')
  return <SentryBoundary>
    {/* <Home /> */}
    Hello
  </SentryBoundary>
};

export default hot(App);
