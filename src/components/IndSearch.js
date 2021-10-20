import React from 'react';

const IndSearch = (props) => {
    return (
        <div className='indSearchSongView' name={props.name} id_track={props.track} id_album={props.album_id} id_artist={props.artist_id} onClick={props.onClick}>
           <p className='nameSearchSong'>{props.name}</p>
           <p className='artistSearchSong'>{props.artist}</p> 
        </div>
    )
}

export default IndSearch;