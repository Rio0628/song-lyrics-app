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
      searchResults: [],
      currentAlbum: {},
      currentSearchValue: '',
      currentClickedSong: '',
      searchTriggered: false,
      clickedSong: false,
      triggerMainSongCntr: false,
    }
  }
  
  render() {
    let indSongChildren = [], indSongSearch = [], currentSong;
    
    // console.log(this.state.testSongs[0]);

    const onChange = (e) => {
      // console.log(e.target.value);
      if (e.target.className === 'searchbar') {
        this.setState({ currentSearchValue: e.target.value });
      }
    }

    const onClick = async (e) => {
      console.log(e.target)
      
      if (e.target.className === 'indSongView') {
        let currentSongLyrics;

        if (e.target.getAttribute('has_lyrics') === 'true') {
          await Axios.get(`https://api.happi.dev/v1/music/artists/${e.target.getAttribute('id_artist')}/albums/${e.target.getAttribute('id_album')}/tracks/${e.target.getAttribute('id_track')}/lyrics?apikey=9cc8abAVG5ajE1k2R03knZAiY4TJwnXd8QgfXpIknBhvl1PPcIfEfRfa`).then(song => currentSongLyrics = song.data.result.lyrics);
        }
        else { currentSongLyrics = 'Lyrics Not Available.' }

        this.setState({ currentClickedSong: e.target.getAttribute('name') });
        this.setState({ currentClickedSongArtist: e.target.getAttribute('artist') });
        this.setState({ currentClickedSongAlbum: e.target.getAttribute('album') });
        this.setState({ currentClickedSongCover: e.target.getAttribute('cover') });
        this.setState({ currentClickedSongLyrics: currentSongLyrics});
        
      }

      if (e.target.className === 'indSearchSongView') {
        let currentSongLyrics, currentSongAlbum;

        await Axios.get(`https://api.happi.dev/v1/music/artists/${e.target.getAttribute('id_artist')}/albums/${e.target.getAttribute('id_album')}/tracks/${e.target.getAttribute('id_track')}/lyrics?apikey=9cc8abAVG5ajE1k2R03knZAiY4TJwnXd8QgfXpIknBhvl1PPcIfEfRfa`).then(song => currentSongLyrics = song.data.result.lyrics);

        this.setState({ currentClickedSong: e.target.getAttribute('name') });
        this.setState({ currentClickedSongArtist: e.target.getAttribute('artist') });
        this.setState({ currentClickedSongAlbum: e.target.getAttribute('album') });
        this.setState({ currentClickedSongCover: e.target.getAttribute('cover') });
        this.setState({ currentClickedSongLyrics: currentSongLyrics});

        // Call the album api call to display the album of the current clicked song 
        
        await Axios.get(`https://api.happi.dev/v1/music/artists/${e.target.getAttribute('id_artist')}/albums/${e.target.getAttribute('id_album')}/tracks?apikey=9cc8abAVG5ajE1k2R03knZAiY4TJwnXd8QgfXpIknBhvl1PPcIfEfRfa`).then(album => currentSongAlbum = album.data.result);

        this.setState({ currentAlbum: currentSongAlbum});
        this.setState({ clickedSong: true });
        this.setState({ triggerMainSongCntr: true });
      }

      if (e.target.className === 'searchBtn') {
        let results = [];
        await Axios.get(`https://api.happi.dev/v1/music?q=${this.state.currentSearchValue}&limit=10&apikey=9cc8abAVG5ajE1k2R03knZAiY4TJwnXd8QgfXpIknBhvl1PPcIfEfRfa&type=&lyrics=1`).then(res => results = res.data.result);
        
        
        this.setState({ searchResults: results });
        this.setState({ searchTriggered: true});
        this.setState({ clickedSong: false });
        // Include the main search Axios API call in here with the search request of the onChange state
      }
    }
    
    console.log(this.state.searchResults)
    // console.log(this.state.currentClickedSong)
    
    // for (let i = 0; i < this.state.indSongs.length; i++) {
    //   indSongChildren.push(<IndSong number={this.state.indSongs[i].song} name={this.state.indSongs[i].name} duration={this.state.indSongs[i].duration} key={'Song ' + [i]} onClick={onClick}/>);
    // }

    if (this.state.clickedSong) {
      for (let i = 0; i < this.state.currentAlbum.length; i++) {
        indSongChildren.push(<IndSong number={i + 1} name={this.state.currentAlbum.tracks[i].track} track={this.state.currentAlbum.tracks[i].id_track} artist={this.state.currentAlbum.artist} artist_id={this.state.currentAlbum.id_artist} album={this.state.currentAlbum.album} album_id={this.state.currentAlbum.id_album} cover={this.state.currentAlbum.cover} has_lyrics={this.state.currentAlbum.tracks[i].haslyrics.toString()} key={"Song" + [i]} onClick={onClick}/>);
      }
    }

    if (this.state.searchTriggered) {
      for (let i = 0; i < this.state.searchResults.length; i++) {
        indSongSearch.push(<IndSearch name={this.state.searchResults[i].track} track={this.state.searchResults[i].id_track} artist={this.state.searchResults[i].artist} artist_id={this.state.searchResults[i].id_artist} album={this.state.searchResults[i].album} album_id={this.state.searchResults[i].id_album} cover={this.state.searchResults[i].cover} key={"Song" + [i]} onClick={onClick}/>);
      }
    }
    console.log(this.state.currentAlbum)
    return (
      <div className="container">

        <div className='mainSongContainer'>
          <div className='searchbarContainer'>
            <input className='searchbar' type='text' placeholder='Enter Song Name...' onChange={onChange}/>
            <div className='searchBtn' onClick={onClick}>Search</div>
          </div>
          {this.state.triggerMainSongCntr ? 
            <MainSongCntr name={this.state.currentClickedSong} artist={this.state.currentClickedSongArtist} album={this.state.currentClickedSongAlbum} lyrics={this.state.currentClickedSongLyrics} cover={this.state.currentClickedSongCover}/>
            : 
            <h1 className='previewMessage'>Search Song to View Lyrics</h1>
          }
          
        </div>

        <div className='search-albumCntr'>
          {/* <h1>Search - Album</h1> */}

          {/* <div className='albumCntr'>
            <img className='albumImgRdc' src={Album} alt='Album Cover'></img>
            <p className='albumName'>Album #1</p>
            <p className='artistName'>Artist</p>
            <div className='lineBreakHeadingAlbm'></div>
            <div className='indSongContainer'>
              {indSongChildren}
            </div>
          </div> */}

          {/* <div className='searchResultsCntr'>
            <h3 className='searchHeading'>Search</h3>
            <div className='lineBreakSearch'></div>
            <div className='indSearchContainer'>
              {indSongSearch}
            </div>
          </div> */}

          {this.state.clickedSong ?
            <div className='albumCntr'>
              <img className='albumImgRdc' src={this.state.currentAlbum.cover} alt='Album Cover'></img>
              <p className='albumName'>{this.state.currentAlbum.album}</p>
              <p className='artistName'>{this.state.currentAlbum.artist}</p>
              <div className='lineBreakHeadingAlbm'></div>
              <div className='indSongContainer'>
                {indSongChildren}
              </div>
            </div> 
          : 
          <div className='searchResultsCntr'>
            <h3 className='searchHeading'>Search</h3>
            <div className='lineBreakSearch'></div>
            <div className='indSearchContainer'>
              {indSongSearch}
            </div>
          </div>
        }

        </div>
      </div>
    );
  }

}

export default App;
