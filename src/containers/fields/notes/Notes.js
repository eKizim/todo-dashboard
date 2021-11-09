import React from 'react';
import Note from '../../../components/Note.js'
import './Notes.css';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id="notes">
				<NotesHeader />
				<Note unitId="1" unitPreview="Testing note" unitDate="08.11.21" />
				<Note unitId="2" unitPreview="Testing note -- 2" unitDate="09.11.21" />
				<Note unitId="3" unitPreview="Testing note -- 3" unitDate="10.11.21" />
				<Note unitId="4" unitPreview="Testing note -- 4" unitDate="11.11.21" />
				<Note unitId="5" unitPreview="Testing note -- 5" unitDate="12.11.21" />
			</div>
		)
	}
};

class NotesHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notesLength: document.getElementsByClassName('note_unit').length,
		}
	}

	componentDidMount() {
		this.setState({
			notesLength: document.getElementsByClassName('note_unit').length,
		})
	}

	render() {
		return(
			<div id="notes_header">
				<p id="notes_header__indicator">{this.state.notesLength}</p>
				<p id="notes_header__filter">Filter</p>
			</div>
		)
	}
}

