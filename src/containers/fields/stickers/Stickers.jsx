import React from 'react';
import StickerUnit from '../../../components/StickerUnit.jsx';
import './Stickers.css';

const Stickers = ({stickersData, readerModeOn, deleteItem}) => {

	const eventHandler = (e) => {
		switch(e.target.className) {
			case "sticker_unit":
				readerModeOn(e, 'stickers');
				break;
			case "sticker_unit__delete-button":
				deleteItem(e, 'sticker');
				break;
		}
	}

	return(
		<div id="stickers" onClick={eventHandler}>
			{stickersData.map(sticker => <StickerUnit key={sticker.unitId} unitId={sticker.unitId} unitTitle={sticker.unitTitle} unitDate={sticker.unitDate}/>)}
		</div>
	)
}

export default Stickers;
