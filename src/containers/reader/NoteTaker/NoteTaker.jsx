import React from 'react';
import './NoteTaker.css';

export default class NoteTaker extends React.Component {
  constructor(props) {
    super(props);

  }

  handleInput = () => {
    let title = document.getElementById('note_taker__title');
    let text = document.getElementById('note_taker__textarea');

    if(title.value && text.value) {
      console.log(`Title: ${title.value}`);
      console.log(`Text: ${text.value}`);
    }

  }

  render() {
    return (
      <div id="note_taker">
        <input id="note_taker__title" type="text" placeholder="Write note title here" />
        <textarea id="note_taker__textarea" placeholder="Write your note here"></textarea>
        <div id="note_taker__buttons">
          <button id="note_done">Done</button>
          <button id="note_cancel" onClick={this.props.manageField}>Cancel</button>
        </div>
      </div>
    )
  }
}
