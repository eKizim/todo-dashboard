import React from 'react';
import './Sticker.css';

export default class Sticker extends React.Component {
	constructor(props) {
		super(props);
		this.stickerDate = this.props.stickerDate;
		this.stickerTitle = this.props.stickerTitle;
	}

	render() {
		return (
			<div className="sticker">
				<p>{this.stickerDate}</p>
				<p>{this.stickerTitle}</p>
			</div>
		)
	}	
}
