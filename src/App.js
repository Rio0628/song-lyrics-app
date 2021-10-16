import React from 'react';
import IndSong from './components/IndSong.js';
import MainSongCntr from './components/MainSongCntr.js';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        
        <div className='mainSongContainer'>

          <div className='searchbarContainer'>
            <input className='searchbar' type='text' placeholder='Enter Song Name...'/>
            <div className='searchBtn'>Search</div>
          </div>
        
        </div>

        <div className='search-albumCntr'>
          <h1>Search - Album</h1>
        </div>
        {/* <MainSongCntr /> */}
        {/* <IndSong /> */}
      </div>
    );
  }
  
}

export default App;
