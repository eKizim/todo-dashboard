import React from 'react';
import NoteUnit from '../../../components/NoteUnit.jsx';
import './Notes.css';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);
	}	

	eventHandler = (e) => {
		switch(e.target.className) {
			case "note_unit":
				this.props.readerModeOn(e, 'notes');
				break;
			case "note_trash__button":
				this.props.deleteItem(e, 'note');
				break;
		}
	}

	render() {
		return(
			<div id="notes" onClick={this.eventHandler}>
				{this.props.notesData.map(note => <NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>)}
			</div>
		)
	}
};

