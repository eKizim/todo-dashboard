import React from 'react';
import Notes from './notes/Notes.jsx';
import Stickers from './stickers/Stickers.jsx';
import './Fields.css';

export default function Fields() {
    return (
      <div id="fields">
        <Stickers/>
        <Notes/>
      </div>
    )
}
