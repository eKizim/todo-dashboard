import React from 'react';
import Notes from './notes/Notes.js';
import Stickers from './stickers/Stickers.js';
import './Fields.css';

export default class Fields extends React.Component {
  render() {
    return (
      <div id="fields">
        <Stickers/>
        <Notes/>
      </div>
    )
  }
}
