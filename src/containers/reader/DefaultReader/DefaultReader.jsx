import React from 'react';
import ReactDOM from 'react-dom';
import './DefaultReader.css';


export default class DefaultReader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="default_reader">
        <div id="default_reader__title">
          <h3>There is nothing now</h3>
          <p>Choose or create something</p>  
        </div>
        <div id="default_reader__buttons">
          <button id="note_starter" onClick={this.props.manageField}>Click to write a new note...</button>
          <button id="sticker_starter" onClick={this.props.manageField}>Click to write a new sticker...</button>
        </div>
      </div>
    )
  }
}
