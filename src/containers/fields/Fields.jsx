import React from 'react';
import Notes from './notes/Notes.jsx';
import Stickers from './stickers/Stickers.jsx';
import './Fields.css';

export default class Fields extends React.Component {
  render() {
    return (
      <div id="fields">
        <Stickers/>
        <Notes notes={this.props.notes}/>
      </div>
    )
  }
}
