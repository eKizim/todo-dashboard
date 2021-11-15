import React from 'react';
import DefaultReader from './DefaultReader/DefaultReader.jsx';
import NoteTaker from './NoteTaker/NoteTaker.jsx';
import StickerTaker from './StickerTaker/StickerTaker.jsx';
import './Reader.css';

export default class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: <DefaultReader manageField={this.manageField}/>
    } 
  }

  manageField = (el) => {
    switch(el.target.id) {
      case "note_starter":
        this.setState({
          field: <NoteTaker manageField={this.manageField}/>
        });
        break;
      case "sticker_starter": 
        this.setState({
          field: <StickerTaker manageField={this.manageField}/>
        });
        break;
      case "note_cancel":
      case "sticker_cancel":
        this.setState({
          field: <DefaultReader manageField={this.manageField}/>
        });
        break;
    } 
  }
  
  render() {
    return <div id="reader">{ this.state.field }</div>
  }
}
