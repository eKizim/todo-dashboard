import React from 'react';
import Controller from './containers/controller/Controller.jsx';
import ModalFields from './containers/modal_fields/ModalFields.jsx';
import Fields from './containers/fields/Fields.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notesData: [],
      stickersData: [],
      
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

  componentDidMount() {
    setTimeout(() => {
      if(window.sessionStorage.notes) {
        this.setState({
          notesData: JSON.parse(window.sessionStorage.notes),
        });
      }
      if(window.sessionStorage.stickers) {
        this.setState({
          stickersData: JSON.parse(window.sessionStorage.stickers)
        })
      }
    }, 150);
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
    window.sessionStorage.setItem(_type, JSON.stringify(storage));
  }

  fullCleanUp() {
    if(confirm('Do you really want to delete all notes and stickers?')) {
      this.setState({
        stickersData: [],
        notesData: []
      });
      window.sessionStorage.clear();
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
    const storage = JSON.parse(window.sessionStorage.getItem(_target));
    const filter = storage.find(item => item.unitId === Number(_e.target.firstChild.innerText));

    switch(_target) {
      case "notes":
        this.setState({
          noterState: {mode: 'read', id: filter.unitId, title: filter.unitTitle, fill: filter.unitFill}
        });
        document.getElementById('modal_fields').classList.add('active');
        document.getElementById('noter').classList.add('show');
        break;
      case "stickers":
        this.setState({
          stickerState: {mode: 'read', id: filter.unitId, title: filter.unitTitle, fill: filter.unitFill}
        });
        document.getElementById('modal_fields').classList.add('active');
        document.getElementById('master_sticker').classList.add('show');
        break;
    }
  }

  //### REWRITE FUNCTION ###
  stickerTaskCheck = (_e) => {
    let storage = JSON.parse(window.sessionStorage.stickers);
    
    storage.forEach(sticker => {
      if(sticker.unitId === Number(document.getElementById('sticker_reader').dataset.stickerId)) {
        sticker.unitFill.forEach(task => {
          if(task.taskId === _e.target.dataset.key) {
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
    window.sessionStorage.stickers = JSON.stringify(storage);
  }

  deleteItem = (_e, _target) => {
    const storage = JSON.parse(window.sessionStorage.getItem(`${_target}s`));
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

    window.sessionStorage.setItem(`${_target}s`, JSON.stringify(filteredStorage));
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
