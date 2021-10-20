import React from 'react';
import Album from '../images/exampleAlbumCover.jpg';

const MainSongCntr = (props) => {
    return (
        <div className='mainSongView'>
            <img className='albumImg' src={Album} alt='album cover'></img>
            <h2 className='mainSongName'>{props.name}</h2>
            
            <div className='otherInfoCntr'>
                <p className='mainSongArtist'>{props.artist}</p>
                <p className='mainSongAlbum'>{props.album}</p>
            </div>

            <p className='mainSongLyrics'>{props.lyrics}</p>
        </div>
    )
}

export default MainSongCntr;