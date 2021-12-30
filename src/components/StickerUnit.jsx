import React from 'react';
import TrashIcon from '../images/Trash.svg';
import './StickerUnit.css';

export default function Sticker({unitId, unitTitle, unitDate}) {
	return (
		<div className="sticker_unit">
			<p className="sticker_unit__id">{unitId}</p>
			<p className="sticker_unit__date">{unitDate}</p>
			<p className="sticker_unit__title">{unitTitle}</p>
			<button className="sticker_unit__delete-button"><img src={TrashIcon} alt="trash-icon" /></button>
		</div>
	);
}	

