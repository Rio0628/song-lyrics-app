import React from 'react';

const IndSong = (props) => {
    return (
        <div className='indSongView'>
           <p className='numSong'>{props.number}</p>
           <p className='nameSong'>{props.name}</p>
           <p className='durationSong'>{props.duration}</p> 
        </div>
    )
}

export default IndSong;