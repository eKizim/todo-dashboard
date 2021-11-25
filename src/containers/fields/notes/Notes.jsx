import React from 'react';
import NoteUnit from '../../../components/NoteUnit.jsx';
import './Notes.css';

const Notes = ({notesData, readerModeOn, deleteItem}) => {

	const eventHandler = (e) => {
		switch(e.target.className) {
			case "note_unit":
				readerModeOn(e, 'notes');
				break;
			case "note_trash__button":
				deleteItem(e, 'note');
				break;
		}
	}

	return(
		<div id="notes" onClick={eventHandler}>
			{notesData.map(note => <NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>)}
		</div>
	)
};

export default Notes;

