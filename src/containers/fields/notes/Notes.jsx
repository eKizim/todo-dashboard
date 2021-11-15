import React from 'react';
import NoteUnit from '../../../components/NoteUnit.jsx';
import './Notes.css';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);
	}	

	render() {
		return(
			<div id="notes">
				<NotesHeader/>
				<div id="notes_dashboard">
					{this.props.notes.map(note => (
        		<NoteUnit key={note.unitId} unitId={note.unitId} unitTitle={note.unitTitle} unitDate={note.unitDate}/>
      			))
					}
				</div>
			</div>
		)
	}
};


class NotesHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id="notes_header">
				<p id="notes_header__indicator"></p>
				<p id="notes_header__filter">Filter</p>
			</div>
		)
	}
}


