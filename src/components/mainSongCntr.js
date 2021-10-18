import React from 'react';
import Album from '../images/exampleAlbumCover.jpg';

const MainSongCntr = (props) => {
    return (
        <div className='mainSongView'>
            <img className='albumImg' src={Album} alt='album cover'></img>
            <h2 className='mainSongName'>{props.name}</h2>
            
            <div className='otherInfoCntr'>
                <p className='mainSongArtist'>Artist</p>
                <p className='mainSongDuration'>3:43</p>
            </div>

            <h3 className='mainSongLyrics'>This is a dummy text for the lyrics of the dummy song</h3>
        </div>
    )
}

export default MainSongCntr;