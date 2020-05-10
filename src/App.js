import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import LabellingPage from './pages/labelling/labelling';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={LabellingPage} />
      </Switch>
    </div>
  );
}

export default App;
