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
      currentAlbum: {},
      currentSearchValue: '',
      currentClickedSong: '',
      testSongs: [
        {
          "track": "SICKO MODE",
          "id_track": 5322024,
          "haslyrics": true,
          "artist": "Travis Scott",
          "id_artist": 6243,
          "album": "ASTROWORLD",
          "id_album": 348193,
          "bpm": 155,
          "lang": "en",
          "cover": "https://api.happi.dev/v1/music/cover/348193",
          "api_artist": "https://api.happi.dev/v1/music/artists/6243",
          "api_albums": "https://api.happi.dev/v1/music/artists/6243/albums",
          "api_album": "https://api.happi.dev/v1/music/artists/6243/albums/348193",
          "api_tracks": "https://api.happi.dev/v1/music/artists/6243/albums/348193/tracks",
          "api_track": "https://api.happi.dev/v1/music/artists/6243/albums/348193/tracks/5322024",
          "api_lyrics": "https://api.happi.dev/v1/music/artists/6243/albums/348193/tracks/5322024/lyrics"
        },
        {
          "track": "SICKO MODE X 10",
          "id_track": 13536921,
          "haslyrics": false,
          "artist": "Cosmic",
          "id_artist": 102660,
          "album": "SICKO MODE X 10",
          "id_album": 1035160,
          "bpm": 155,
          "lang": "??",
          "cover": "https://api.happi.dev/v1/music/cover/1035160",
          "api_artist": "https://api.happi.dev/v1/music/artists/102660",
          "api_albums": "https://api.happi.dev/v1/music/artists/102660/albums",
          "api_album": "https://api.happi.dev/v1/music/artists/102660/albums/1035160",
          "api_tracks": "https://api.happi.dev/v1/music/artists/102660/albums/1035160/tracks",
          "api_track": "https://api.happi.dev/v1/music/artists/102660/albums/1035160/tracks/13536921",
          "api_lyrics": "https://api.happi.dev/v1/music/artists/102660/albums/1035160/tracks/13536921/lyrics"
        },
      ],
      searchTriggered: false,
      clickedSong: false,
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
        this.setState({ currentClickedSong: e.target.getAttribute('name') });      
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
        this.setState({ clickedSong: true });

        await Axios.get(`https://api.happi.dev/v1/music/artists/${e.target.getAttribute('id_artist')}/albums/${e.target.getAttribute('id_album')}/tracks?apikey=9cc8abAVG5ajE1k2R03knZAiY4TJwnXd8QgfXpIknBhvl1PPcIfEfRfa`).then(album => currentSongAlbum = album.data.result);

        this.setState({ currentAlbum: currentSongAlbum});
      }

      if (e.target.className === 'searchBtn') {
        let results = [];
        await Axios.get(`https://api.happi.dev/v1/music?q=${this.state.currentSearchValue}&limit=10&apikey=9cc8abAVG5ajE1k2R03knZAiY4TJwnXd8QgfXpIknBhvl1PPcIfEfRfa&type=&lyrics=1`).then(res => results = res.data.result);
        
        
        this.setState({ searchResults: results });
        this.setState({ searchTriggered: true});
        // Include the main search Axios API call in here with the search request of the onChange state
      }
    }
    
    console.log(this.state.searchResults)
    console.log(this.state.currentTrackId)
    // console.log(this.state.currentClickedSong)
    
    // for (let i = 0; i < this.state.indSongs.length; i++) {
    //   indSongChildren.push(<IndSong number={this.state.indSongs[i].song} name={this.state.indSongs[i].name} duration={this.state.indSongs[i].duration} key={'Song ' + [i]} onClick={onClick}/>);
    // }

    if (this.state.clickedSong) {
      for (let i = 0; i < this.state.currentAlbum.length; i++) {
        indSongChildren.push(<IndSong number={i + 1} name={this.state.currentAlbum.tracks[i].track} track={this.state.currentAlbum.tracks[i].id_track} artist={this.state.currentAlbum.artist} artist_id={this.state.currentAlbum.id_artist} album={this.state.currentAlbum.album} album_id={this.state.currentAlbum.id_album} cover={this.state.currentAlbum.cover} key={"Song" + [i]} onClick={onClick}/>);
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

          <MainSongCntr name={this.state.currentClickedSong} artist={this.state.currentClickedSongArtist} album={this.state.currentClickedSongAlbum} lyrics={this.state.currentClickedSongLyrics} cover={this.state.currentClickedSongCover}/>
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
