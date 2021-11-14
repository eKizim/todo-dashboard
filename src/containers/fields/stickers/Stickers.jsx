import React from 'react';
import StickerUnit from '../../../components/StickerUnit.jsx';
import './Stickers.css';

export default class Stickers extends React.Component {
	render() {
		return(
			<div id="stickers">
				<StickerUnit stickerTitle="Sticker Check" stickerDate="09.11.21"/>
			</div>
		)
	}
}
