import React from 'react';
import IndSong from './components/IndSong.js';
import MainSongCntr from './components/MainSongCntr.js';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Mario</h1>
        <MainSongCntr />
        {/* <IndSong /> */}
      </div>
    );
  }
  
}

export default App;
