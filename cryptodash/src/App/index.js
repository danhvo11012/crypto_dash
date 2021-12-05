import React, { Component } from 'react';
import Welcome from './WelcomeMessage';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';

import styled, { css } from 'styled-components';


class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppBar />
        <Welcome  />
      </AppLayout>
    );  
  }
}

export default App;
