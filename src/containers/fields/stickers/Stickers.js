import React from 'react';
import Sticker from '../../../components/Sticker.js';
import './Stickers.css';

export default class Stickers extends React.Component {
	render() {
		return(
			<div id="stickers">
				<Sticker stickerTitle="Sticker Check" stickerDate="09.11.21"/>
			</div>
		)
	}
}
