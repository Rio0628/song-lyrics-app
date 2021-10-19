import React from 'react';
import IndSong from './components/IndSong.js';
import IndSearch from './components/IndSearch.js';
import MainSongCntr from './components/MainSongCntr.js';
import Album from './images/exampleAlbumCover.jpg';
import Axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indSongs: [
        {song: '1', name: 'First Song', duration: '3:32'},
        {song: '2', name: 'Second Song', duration: '3:53'},
        {song: '3', name: 'Third Song', duration: '3:44'},
        {song: '4', name: 'Fourth Song', duration: '3:43'},
      ],
      searchSongs: [
        {name: 'First Song', artist: 'First Artist'},
        {name: 'Second Song', artist: 'Second Artist'},
        {name: 'Third Song', artist: 'Third Artist'},
        {name: 'Fourth Song', artist: 'Fourth Artist'},
      ],
      searchResults: [],
      currentClickedSong: '',
    }
  }
  
  render() {
    let indSongChildren = [], indSongSearch = [];
      
    Axios.get('https://api.happi.dev/v1/music?q=sicko%20mode&limit=10&apikey=9cc8abAVG5ajE1k2R03knZAiY4TJwnXd8QgfXpIknBhvl1PPcIfEfRfa&type=&lyrics=0').then(res => console.log(res));

    const onClick = (e) => {
      console.log(e.target)
      
      if (e.target.className === 'indSongView') {
        this.setState({ currentClickedSong: e.target.getAttribute('name') });      
      }

      if (e.target.className === 'indSearchSongView') {
        this.setState({ currentClickedSong: e.target.getAttribute('name') });         
      }
    }

    for (let i = 0; i < this.state.indSongs.length; i++) {
      indSongChildren.push(<IndSong number={this.state.indSongs[i].song} name={this.state.indSongs[i].name} duration={this.state.indSongs[i].duration} key={'Song ' + [i]} onClick={onClick}/>);
    }

    for (let i = 0; i < this.state.searchSongs.length; i++) {
      indSongSearch.push(<IndSearch name={this.state.searchSongs[i].name} artist={this.state.searchSongs[i].artist} key={"Song" + [i]} onClick={onClick}/>);
    }
    
    return (
      <div className="container">

        <div className='mainSongContainer'>
          <div className='searchbarContainer'>
            <input className='searchbar' type='text' placeholder='Enter Song Name...'/>
            <div className='searchBtn'>Search</div>
          </div>

          <MainSongCntr name={this.state.currentClickedSong}/>
        </div>

        <div className='search-albumCntr'>
          {/* <h1>Search - Album</h1> */}

          <div className='albumCntr'>
            <img className='albumImgRdc' src={Album} alt='Album Cover'></img>
            <p className='albumName'>Album #1</p>
            <p className='artistName'>Artist</p>
            <div className='lineBreakHeadingAlbm'></div>
            <div className='indSongContainer'>
              {indSongChildren}
            </div>
          </div>

          {/* <div className='searchResultsCntr'>
            <h3 className='searchHeading'>Search</h3>
            <div className='lineBreakSearch'></div>
            <div className='indSearchContainer'>
              {indSongSearch}
            </div>
          </div> */}
        </div>
      </div>
    );
  }

}

export default App;
