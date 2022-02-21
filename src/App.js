import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SearchParam from './searchParams';
import Details from './Details';
import ThemeContext from './ThemContext';
import './style.css';

const App = () => {
  const theme = useState('darkblue')
  return (
    <ThemeContext.Provider value={theme}>
    <div>
      <Router>
      <header>
      <Link to="/">
      <Link path="/">Adopt me!</Link>
      </Link>
      </header>
        <Switch>
        <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/">
          <SearchParam />
          </Route>
        </Switch>
      </Router>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
