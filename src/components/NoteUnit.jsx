import React from 'react';
import TrashIcon from '../images/Trash.svg';
import './NoteUnit.css';

export default function Note({unitId, unitTitle, unitDate}) {
	return(
		<div className="note_unit">
			<p className="note_unit__id">{unitId}</p>	
			<p className="note_unit__title">{unitTitle}</p>
			<p className="note_unit__date">{unitDate}</p>
			<button className="note_trash__button"><img src={TrashIcon} alt="trash-icon" /></button>
		</div>
	)
}
