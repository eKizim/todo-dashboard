import React from 'react';
import Notes from './notes/Notes.jsx';
import Stickers from './stickers/Stickers.jsx';
import './Fields.css';

export default class Fields extends React.Component {
  render() {
    return (
      <div id="fields">
        <Stickers 
          stickersData={this.props.stickersData} 
          deleteItem={this.props.deleteItem} 
          readerModeOn={this.props.readerModeOn}/>
        <Notes 
          notesData={this.props.notesData} 
          deleteItem={this.props.deleteItem} 
          readerModeOn={this.props.readerModeOn}/>
      </div>
    )
  }
}
