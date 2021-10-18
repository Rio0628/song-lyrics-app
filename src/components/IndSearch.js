import React from 'react';

const IndSearch = (props) => {
    return (
        <div className='indSearchSongView' onClick={props.onClick}>
           <p className='nameSearchSong'>{props.name}</p>
           <p className='artistSearchSong'>{props.artist}</p> 
        </div>
    )
}

export default IndSearch;