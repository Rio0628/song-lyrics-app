import React from 'react';

const IndSong = (props) => {
    return (
        <div className='indSongView' onClick={props.onClick} name={props.name}>
           <p className='numSong'>{props.number}</p>
           <p className='nameSong'>{props.name}</p>
           <p className='durationSong'>{props.duration}</p> 
        </div>
    )
}

export default IndSong;