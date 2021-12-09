import React, { Component } from 'react';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';
import Content from '../Shared/Content';
import Setting from '../Settings';
import Dashboard from '../Dashboard';


class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Content>
            <Setting  />
            <Dashboard />
          </Content>
        </AppProvider>
      </AppLayout>
    );  
  }
}

export default App;
