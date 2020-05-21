import React from 'react';

import Auth from '../components/Auth/Auth';
import Navbar from '../components/Navbar/Navbar';
import PlayerContainer from '../components/PlayerContainer/PlayerContainer';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>HELLO THERE</h1>
        <Navbar />
        <Auth />
        <PlayerContainer />
      </div>
    );
  }
}

export default App;
