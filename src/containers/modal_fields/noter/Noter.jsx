import React from 'react';
import './Noter.css';

export default class Noter extends React.Component {
  constructor(props) {
    super(props);
  }

  closeNoter = () => {
    document.getElementById('noter').classList.remove('show');
    document.getElementById('screen_blocker').classList.remove('active');
  }

  render() {
    return (
            <div id="noter">
              {this.props.noterState.mode === 'input' ? 
              <Writer 
                dataUpdater={this.props.dataUpdater} 
                closeNoter={this.closeNoter}/> 
              : 
              <Reader 
                noterState={this.props.noterState} 
                closeNoter={this.closeNoter}/>}
            </div>
    )
  }
}


class Writer extends React.Component {
  constructor(props) {
    super(props);
  }

  writeNote = () => {
    const title = document.getElementById('writer_title');
    const text = document.getElementById('writer_textarea');
    
    if(title.value && text.value) {
      this.props.dataUpdater(title.value, text.value, 'notes');
      title.value = '';
      text.value = '';

      this.props.closeNoter();
    } else {
      console.log('#--EMPTY FIELDS--#')
    }
  }

  render() {
    return (
        <div id="writer">
          <div id="noter_buttons">
            <button id="noter_buttons__done" onClick={this.writeNote}>D</button>
            <button id="noter_buttons__cancel" onClick={this.props.closeNoter}>C</button>
          </div>
          <input id="writer_title" type="text" placeholder="Write your note title here" />
          <textarea id="writer_textarea" placeholder="Write your note here"></textarea>
          <div id="writer_buttons">
          </div>
        </div>
    )
  }
}


class Reader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="reader">
        <div id="noter_buttons">
            <button id="noter_buttons__cancel" onClick={this.props.closeNoter}>C</button>
        </div>
        <p id="reader_title">{this.props.noterState.title}</p>
        <p id="reader_text">{this.props.noterState.fill}</p>
      </div>
    )
  }
}