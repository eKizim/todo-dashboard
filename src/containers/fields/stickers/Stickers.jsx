import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readStickerMode } from '../../../store/masterStickerSlice.jsx';
import StickerUnit from '../../../components/StickerUnit.jsx';
import './Stickers.css';

export default function Stickers({deleteItem}) {
	const dispatch = useDispatch();
	const stickersData = useSelector(state => state.stickersData);

	const readerModeOn = (_target) => {
		let sticker = stickersData.find(sticker => sticker.unitId === Number(_target.firstChild.textContent));
		dispatch(readStickerMode(sticker));
		
		document.getElementById('modal_fields').classList.add('active');
        document.getElementById('master_sticker').classList.add('show');
	}

	const eventHandler = (e) => {
		switch(e.target.className) {
			case "sticker_unit":
				readerModeOn(e.target);
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

