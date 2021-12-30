import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readNoteMode, updateNotesData } from '../../../store/notesSlice.jsx';
import NoteUnit from '../../../components/NoteUnit.jsx';
import './Notes.css';

export default function Notes() {
	const dispatch = useDispatch();
	const notesData = useSelector(state => state.notes.notesData);

	const readerModeOn = (_target) => {
		let note = notesData.find(note => note.unitId === Number(_target.firstChild.textContent));
		dispatch(readNoteMode(note));
		
		document.getElementById('modal_fields').classList.add('active');
		document.getElementById('noter').classList.add('show');
	};

	const deleteNote = (_target) => {
		let rNote = _target.closest('.note_unit');

		// Make a storage copy
		let filteredData = JSON.parse(JSON.stringify(notesData));
		
		filteredData = filteredData.filter(note => note.unitId !== Number(rNote.firstChild.textContent));
		filteredData.forEach(note => note.unitId = filteredData.indexOf(note) + 1);
		
		dispatch(updateNotesData(filteredData));
	};

	const eventHandler = (e) => {
		switch(e.target.className) {
			case "note_unit":
				readerModeOn(e.target);
				break;
			case "note_trash__button":
				deleteNote(e.target);
				break;
		}
	};

	const renderedNotes = notesData.map(note => <NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>);

	return(
		<div id="notes" onClick={eventHandler}>
			{renderedNotes}
		</div>
	);
};
