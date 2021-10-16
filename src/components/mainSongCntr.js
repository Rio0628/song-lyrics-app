import React from 'react';
import Album from '../images/exampleAlbumCover.jpg';

const MainSongCntr = () => {
    return (
        <div className='mainSongView'>
            <img className='albumImg' src={Album} alt='album cover'></img>
            <h2 className='mainSongName'>Song Name</h2>
            
            <div className='otherInfoCntr'>
                <p className='mainSongAlbum'>Album</p>
                <p className='mainSongDuration'>3:43</p>
            </div>

            <h3 className='mainSongLyrics'>This is a dummy text for the lyrics of the dummy song</h3>
        </div>
    )
}

export default MainSongCntr;