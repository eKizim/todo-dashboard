import React from 'react';
import ReactDOM from 'react-dom';
import Fields from './containers/fields/Fields.jsx';
import Reader from './containers/reader/Reader.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: window.localStorage.notes ?
        JSON.parse(window.localStorage.notes) : [],
      stickers: window.localStorage.stickers ?
        JSON.parse(window.localStorage.stickers) : []
    };

    this.notesUpdate= this.notesUpdate.bind(this);
    this.stickersUpdate= this.stickersUpdate.bind(this);
  }

  notesUpdate() {

    // ### Var for testing ###
    let storage = window.localStorage.notes ? 
      JSON.parse(window.localStorage.notes) : []; 

    storage.push({
      unitId: "test", 
      unitTitle: "TestTitle", 
      unitDate: "TestDate"
    })

    window.localStorage.notes = JSON.stringify(storage);
    
    this.setState({
      notes: JSON.parse(window.localStorage.notes)
    })
  };

  stickersUpdate() {

    // ### Var for testing ###
    let storage = window.localStorage.stickers ? 
      JSON.parse(window.localStorage.stickers) : []; 

    storage.push({
      unitId: "test",
      unitTitle: "TestTitle",
      unitDate: "TestDate"
    })

    window.localStorage.stickers = JSON.stringify(storage);

    this.setState({
      stickers: JSON.parse(window.localStorage.stickers)
    })
  }

  render() {
    return (
      <React.Fragment>
        <Fields notes={this.state.notes} stickers={this.state.stickers}/>
        <Reader notesUpdate={this.notesUpdate} stickersUpdate={this.stickersUpdate}/>
      </React.Fragment>
    )
  }
}
