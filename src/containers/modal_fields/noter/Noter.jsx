import React from 'react';
import DoneIcon from '../../../images/Done.svg';
import CancelIcon from '../../../images/Trash.svg';
import './Noter.css';

const Noter = ({noterState, dataUpdater}) => {

  const closeNoter = () => {
    document.getElementById('noter').classList.remove('show');
    document.getElementById('screen_blocker').classList.remove('active');
  }

  return (
      <div id="noter">
        {noterState.mode === 'input' ? 
        <Writer 
          dataUpdater={dataUpdater} 
          closeNoter={closeNoter}/> 
          : 
        <Reader 
          noterState={noterState} 
          closeNoter={closeNoter}/>}
      </div>
  )
}


const Writer = ({dataUpdater, closeNoter}) => {

  const writeNote = () => {
    const title = document.getElementById('writer_title');
    const text = document.getElementById('writer_textarea');
    
    if(title.value && text.value) {
      dataUpdater(title.value, text.value, 'notes');
      title.value = '';
      text.value = '';

      closeNoter();
    } else {
      console.log('#--EMPTY FIELDS--#')
    }
  }

  return (
    <div id="writer">
      <div id="noter_buttons">
        <button id="noter_buttons__done" onClick={writeNote}><img src={DoneIcon} alt="done-icon" /></button>
        <button id="noter_buttons__cancel" onClick={closeNoter}><img src={CancelIcon} alt="cancel-icon" /></button>
      </div>
      <input id="writer_title" type="text" placeholder="Write your note title here" />
      <textarea id="writer_textarea" placeholder="Write your note here"></textarea>
      <div id="writer_buttons">{/*?????*/}
      </div>
    </div>
  )
}


const Reader = ({noterState, closeNoter}) => {
    return (
      <div id="reader">
        <div id="noter_buttons">
            <button id="noter_buttons__cancel" onClick={closeNoter}>C</button>
        </div>
        <p id="reader_title">{noterState.title}</p>
        <p id="reader_text">{noterState.fill}</p>
      </div>
  )
}


export default Noter;