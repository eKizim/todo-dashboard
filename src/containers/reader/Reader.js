import React from 'react';
import './Reader.css';

export default class Reader extends React.Component {
  render() {
    return(
      <div id="reader_default">
        <div id="reader_default__title">
          <h3>There is nothing now</h3>
          <p>Choose or create something</p>  
        </div>
        <div id="reader_default__buttons">
          <button id="note_starter">Click to write a new note...</button>
          <button id="sticker_starter">Click to write a new sticker...</button>
        </div>
      </div>
    )
  }
}
