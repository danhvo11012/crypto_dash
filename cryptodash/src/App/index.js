import React, { Component } from 'react';
import Welcome from './WelcomeMessage';
import './App.css';
import styled, { css } from 'styled-components';

class App extends Component {
  render() {
    return (
      <div>
        <Welcome  />
      </div>
    );  
  }
}

export default App;
