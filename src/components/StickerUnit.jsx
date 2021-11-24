import React from 'react';
import './StickerUnit.css';

export default function Sticker({unitId, unitTitle, unitDate}) {
	return (
		<div className="sticker_unit">
			<p className="sticker_unit__id">{unitId}</p>
			<p className="sticker_unit__date">{unitDate}</p>
			<p className="sticker_unit__title">{unitTitle}</p>
			<button className="sticker_unit__delete-button">D</button>
		</div>
	)
}	

