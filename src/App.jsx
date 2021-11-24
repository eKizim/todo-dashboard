import React from 'react';
import Controller from './containers/controller/Controller.jsx';
import ModalFields from './containers/modal_fields/ModalFields.jsx';
import Fields from './containers/fields/Fields.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notesData: window.localStorage.notes ?
        JSON.parse(window.localStorage.notes) : [],
      stickersData: window.localStorage.stickers ?
        JSON.parse(window.localStorage.stickers) : [],
      
      stickerState: {
        mode: 'input',
        id: '',
        title: '',
        fill: ''
      },

      noterState: {
        mode: 'input',
        id: '',
        title: '',
        fill: ''
      }
    };

    this.dataUpdater = this.dataUpdater.bind(this);
    this.fullCleanUp = this.fullCleanUp.bind(this);
  }

  dataUpdater = (_title, _fill, _type) => {
    let storage = _type === 'notes' ? this.state.notesData : this.state.stickersData;
    let date = new Date();
    date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(2)}`;

    storage.push({
      unitId: storage.length + 1,
      unitTitle: _title,
      unitFill: _fill,
      unitDate: date
    });

    switch(_type) {
      case "notes":
        this.setState({notesData: storage});
        console.log(`#--NOTES HAS BEEN UPDATED--#`);
        break;
      case "stickers":
        this.setState({stickersData: storage});
        console.log(`#--STICKERS HAS BEEN UPDATED--#`);
        break;
    }
    window.localStorage.setItem(_type, JSON.stringify(storage));
  }

  fullCleanUp() {
    if(confirm('You really want to delete all notes and stickers?')) {
      this.setState({
        stickersData: [],
        notesData: []
      });
      window.localStorage.clear();
    }
  }

  writerModeOn = (_modal) => {
    switch(_modal) {
      case 'noter':
        this.setState({noterState: {mode: 'input', id: '', title: '', fill: ''}});
        break;
      case 'sticker':
        this.setState({stickerState: {mode: 'input', id: '', title: '', fill: ''}});
        break;
    }
  }

  readerModeOn = (_e, _target) => {
    const storage = JSON.parse(window.localStorage.getItem(_target));
    const filter = storage.find(item => item.unitId === Number(_e.target.firstChild.innerText));

    switch(_target) {
      case "notes":
          this.setState({
            noterState: {mode: 'read', id: filter.unitId, title: filter.unitTitle, fill: filter.unitFill}
          });
        
        document.getElementById('screen_blocker').classList.add('active');
        document.getElementById('noter').classList.add('show');
        break;

      case "stickers":
        this.setState({
          stickerState: {mode: 'read', id: filter.unitId, title: filter.unitTitle, fill: filter.unitFill}
        });
        
        document.getElementById('screen_blocker').classList.add('active');
        document.getElementById('master_sticker').classList.add('show');
        break;
    }
  }

  //### FIND BETTER SOLUTION
  stickerTaskCheck = (e) => {
    let storage = JSON.parse(window.localStorage.stickers);
    
    storage.forEach(sticker => {
      if(sticker.unitId === Number(document.getElementById('sticker_reader').dataset.stickerId)) {
        sticker.unitFill.forEach(task => {
          if(task.taskId === e.target.dataset.key) {
            task.done = !task.done;
          }
          
          this.setState({
            stickerState: {
              mode: 'read',
              id: sticker.unitId,
              title: sticker.unitTitle,
              fill: sticker.unitFill
            }
          })
        })
      }
    })
    
    this.setState({
      stickersData: storage
    });
    window.localStorage.stickers = JSON.stringify(storage);
  }

  deleteItem = (_e, _target) => {
    const storage = JSON.parse(window.localStorage.getItem(`${_target}s`));
    const rUnit = _e.target.closest(`.${_target}_unit`);
    
    const filteredStorage = storage.filter(item => item.unitId !==Number(rUnit.firstChild.textContent));
    filteredStorage.forEach(item => item.unitId = filteredStorage.indexOf(item) + 1);

      switch(_target) {
        case "note":
          this.setState({notesData: filteredStorage});
          break;
        case "sticker":
          this.setState({stickersData: filteredStorage});
          break;
    }

    window.localStorage.setItem(`${_target}s`, JSON.stringify(filteredStorage));
  }

  render() {
    return (
      <React.Fragment>
        <Controller 
          writerModeOn={this.writerModeOn} 
          fullCleanUp={this.fullCleanUp}/>
        
        <ModalFields
          noterState={this.state.noterState}
          stickerState={this.state.stickerState}
          stickerTaskCheck={this.stickerTaskCheck}
          dataUpdater={this.dataUpdater}/>
        
        <Fields 
          notesData={this.state.notesData}
          stickersData={this.state.stickersData}
          readerModeOn={this.readerModeOn}
          deleteItem={this.deleteItem}/>
      </React.Fragment>
    )
  }
}
