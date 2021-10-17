import React from 'react';
import IndSong from './components/IndSong.js';
import IndSearch from './components/IndSearch.js';
import MainSongCntr from './components/MainSongCntr.js';
import Album from './images/exampleAlbumCover.jpg';


class App extends React.Component {
  render() {
    return (
      <div className="container">

        <div className='mainSongContainer'>
          <div className='searchbarContainer'>
            <input className='searchbar' type='text' placeholder='Enter Song Name...'/>
            <div className='searchBtn'>Search</div>
          </div>

          <MainSongCntr />
        </div>

        <div className='search-albumCntr'>
          {/* <h1>Search - Album</h1> */}

          {/* <div className='albumCntr'>
            <img className='albumImgRdc' src={Album} alt='Album Cover'></img>
            <p className='albumName'>Album #1</p>
            <p className='artistName'>Artist</p>
            <div className='lineBreakHeadingAlbm'></div>
            <div className='indSongContainer'>
              <IndSong />
              <IndSong />
              <IndSong />
              <IndSong />
              <IndSong />
              <IndSong />
              <IndSong />
              <IndSong />
              <IndSong />
            </div>
          </div> */}

          <div className='searchResultsCntr'>
            <h3 className='searchHeading'>Search</h3>
            <div className='lineBreakSearch'></div>
            <div className='indSearchContainer'>
              <IndSearch />
              <IndSearch />
              <IndSearch />
              <IndSearch />
            </div>
          </div>
        </div>
        {/* <IndSong /> */}
      </div>
    );
  }

}

export default App;
