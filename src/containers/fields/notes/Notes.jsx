import React from 'react';
import NoteUnit from '../../../components/NoteUnit.jsx';
import './Notes.css';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);
	}	

	eventHandler = (e) => {
		switch(e.target.className) {
			case "note_trash__button":
				this.props.notes.deleteNote(e);
				break;
			case "note_unit":
				this.props.notes.noterReaderMode(e);
		}
	}

	render() {
		return(
			<div id="notes" onClick={this.eventHandler}>
				{this.props.notes.notesData.map(note => <NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>)}
			</div>
		)
	}
};

