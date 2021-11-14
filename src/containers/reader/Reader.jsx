import React from 'react';
import ReactDOM from 'react-dom';
import NoteUnit from '../../components/NoteUnit.jsx';
import StickerUnit from '../../components/StickerUnit.jsx';
import './Reader.css';


export default class Reader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="reader_default">
        <div id="reader_default__title">
          <h3>There is nothing now</h3>
          <p>Choose or create something</p>  
        </div>
        <div id="reader_default__buttons">
          <button id="note_starter" onClick={this.props.notesUpdate}>Click to write a new note...</button>
          <button id="sticker_starter" onClick={this.stickersUpdate}>Click to write a new sticker...</button>
        </div>
      </div>
    )
  }
}
