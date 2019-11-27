import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import './App.css';

const App = ({ location }) => (
    <div className='bg'>
        <Route location={ location } path='/' excact component={ HomePage } />
    </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
