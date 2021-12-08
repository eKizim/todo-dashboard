import React from 'react';
import Notes from './notes/Notes.jsx';
import Stickers from './stickers/Stickers.jsx';
import './Fields.css';

export default function Fields({ deleteItem }) {
    return (
      <div id="fields">
        <Stickers 
          deleteItem={deleteItem}/>
        <Notes 
          deleteItem={deleteItem}/>
      </div>
    )
  }
