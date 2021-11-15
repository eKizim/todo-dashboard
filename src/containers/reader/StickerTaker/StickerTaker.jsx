import React from 'react';
import './StickerTaker.css';

export default class StickerTaker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="sticker_taker">
        <input id="sticker_taker__title" type="text" placeholder="Write sticker title here" />
        <input id="sticker_taker__points-field" placeholder="Write your sticker points here" />
        <div id="sticker_taker__buttons">
          <button id="sticker_done">Done</button>
          <button id="sticker_cancel" onClick={this.props.manageField}>Cancel</button>
        </div>
      </div>
    )
  }
}
