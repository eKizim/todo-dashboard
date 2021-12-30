import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readStickerMode, updateStickersData } from '../../../store/stickersSlice.jsx';
import StickerUnit from '../../../components/StickerUnit.jsx';
import './Stickers.css';

export default function Stickers() {
	const dispatch = useDispatch();
	const stickersData = useSelector(state => state.stickers.stickersData);

	const readerModeOn = (_target) => {
		let sticker = stickersData.find(sticker => sticker.unitId === Number(_target.firstChild.textContent));
		dispatch(readStickerMode(sticker.unitId));
		
		document.getElementById('modal_fields').classList.add('active');
        document.getElementById('master_sticker').classList.add('show');
	};

	const deleteSticker = (_target) => {
		let rSticker = _target.closest('.sticker_unit');

		// Make a storage copy
		let filteredData = JSON.parse(JSON.stringify(stickersData));

		filteredData = filteredData.filter(sticker => sticker.unitId !== Number(rSticker.firstChild.textContent));
		filteredData.forEach(sticker => sticker.unitId = filteredData.indexOf(sticker) + 1);
		
		dispatch(updateStickersData(filteredData));
	};

	const eventHandler = (e) => {
		switch(e.target.className) {
			case "sticker_unit":
				readerModeOn(e.target);
				break;
			case "sticker_unit__delete-button":
				deleteSticker(e.target);
				break;
		}
	};

	const renderedStickers = stickersData.map(sticker => <StickerUnit key={sticker.unitId} unitId={sticker.unitId} unitTitle={sticker.unitTitle} unitDate={sticker.unitDate}/>);

	return(
		<div id="stickers" onClick={eventHandler}>
			{renderedStickers}
		</div>
	);
}

