import React from 'react';
import StickerUnit from '../../../components/StickerUnit.jsx';
import './Stickers.css';

export default class Stickers extends React.Component {
	constructor(props) {
		super(props);
	}

	eventHandler = (e) => {
		switch(e.target.className) {
			case "sticker_unit":
				this.props.stickers.stickerReaderMode(e);
				break;
			case "sticker_unit__delete-button":
				this.props.stickers.deleteSticker(e);
				break;
		}
	}

	render() {
		return(
			<div id="stickers" onClick={this.eventHandler}>
				{this.props.stickers.stickersData.map(sticker => <StickerUnit key={sticker.unitId} unitId={sticker.unitId} unitTitle={sticker.unitTitle} unitDate={sticker.unitDate}/>)}
			</div>
		)
	}
}
