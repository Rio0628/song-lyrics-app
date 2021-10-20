import React from 'react';

const IndSong = (props) => {
    return (
        <div className='indSongView' name={props.name} artist={props.artist} album={props.album} id_track={props.track} id_album={props.album_id} id_artist={props.artist_id} cover={props.cover} has_lyrics={props.has_lyrics} onClick={props.onClick}>
           <p className='numSong'>{props.number}</p>
           <p className='nameSong'>{props.name}</p> 
        </div>
    )
}

export default IndSong;