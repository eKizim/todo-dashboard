import React from 'react';
import ReactDOM from 'react-dom';
import Fields from './containers/fields/Fields.jsx';
import Reader from './containers/reader/Reader.jsx';
import NoteUnit from './components/NoteUnit.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      notes: window.localStorage.notes ?
      JSON.parse(window.localStorage.notes).map(note => (
        <NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>
      )) : [],
     
      stickers: window.localStorage.stickers ? 
      JSON.parse(window.localStorage.stickers).map(sticker => {
        return <StickerUnit key={sticker.unitId} unitId={sticker.unitId} unitTitle={sticker.unitTitle} unitDate={sticker.unitDate}/>
      }) : []
    };

    this.notesUpdate= this.notesUpdate.bind(this);
    this.stickersUpdate= this.stickersUpdate.bind(this);
  }

  notesUpdate() {
    let storage = window.localStorage.notes ? JSON.parse(window.localStorage.notes) : []; // DELETE THIS
    storage.push({unitId: "test", unitTitle: "TestTitle", unitDate: "TestDate"})
    window.localStorage.notes = JSON.stringify(storage);
    
    this.setState({
      notes: JSON.parse(window.localStorage.notes).map(note => (
        <NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>
      )) 
    })

    console.log("Notes has been updated")
  };

  stickersUpdate() {
    this.setState({
      stickers: JSON.parse(window.localStorage.stickers).map(sticker => (
        <NoteUnit key={sticker.unitId} unitId={sticker.unitId} unitTitle={sticker.unitTitle} unitDate={sticker.unitDate}/>
      )) 
    })
    console.log("Stickers has been updated")
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
