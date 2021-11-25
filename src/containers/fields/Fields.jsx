import React from 'react';
import Notes from './notes/Notes.jsx';
import Stickers from './stickers/Stickers.jsx';
import './Fields.css';

const Fields = ({stickersData, notesData, deleteItem, readerModeOn}) => {
    return (
      <div id="fields">
        <Stickers 
          stickersData={stickersData} 
          deleteItem={deleteItem} 
          readerModeOn={readerModeOn}/>
        <Notes 
          notesData={notesData} 
          deleteItem={deleteItem} 
          readerModeOn={readerModeOn}/>
      </div>
    )
  }

  export default Fields;