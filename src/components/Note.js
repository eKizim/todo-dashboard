import React from 'react';
import './Note.css';

export default class Note extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="note_unit">
				<p className="note_unit__id">{this.props.unitId}</p>	
				<p className="note_unit__preview">{this.props.unitPreview}</p>
				<p className="note_unit__date">{this.props.unitDate}</p>
				<div className="note_unit__buttons">
					<button className="note_up__button">Up</button>
					<button className="note_down__button">Down</button>
					<button className="note_edit__button">Edit</button>
					<button className="note_trash__button">Trash</button>
				</div>
			</div>
		)
	}
}
