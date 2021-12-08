import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readNoteMode } from '../../../store/noterSlice.jsx';
import { deleteNote } from '../../../store/notesData.jsx';
import NoteUnit from '../../../components/NoteUnit.jsx';
import './Notes.css';

export default function Notes() {
	const dispatch = useDispatch();
	const notesData = useSelector(state => state.notesData);

	function readerModeOn(_target) {
		let note = notesData.find(note => note.unitId === Number(_target.firstChild.textContent));
		dispatch(readNoteMode(note));
		
		document.getElementById('modal_fields').classList.add('active');
		document.getElementById('noter').classList.add('show');
	}

	const eventHandler = (e) => {
		switch(e.target.className) {
			case "note_unit":
				readerModeOn(e.target);
				break;
			case "note_trash__button":
				dispatch(deleteNote())
				break;
		}
	}

	return(
		<div id="notes" onClick={eventHandler}>
			{notesData.map(note => <NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>)}
		</div>
	)
};