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
        tasks: ''
      },

      noterState: {
        mode: 'input',
        id: '',
        title: '',
        text: ''
      }
    };

    this.notesUpdate = this.notesUpdate.bind(this);
    this.stickersUpdate = this.stickersUpdate.bind(this);
    this.fullCleanUp = this.fullCleanUp.bind(this);
  }

  notesUpdate(title, text) {
    let storage = this.state.notesData;

    let date = new Date();
    date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(2)}`

    storage.push({
      unitId: storage.length + 1, 
      unitTitle: title, 
      unitText: text,
      unitDate: date
    })

    this.setState({
      notesData: storage
    });

    window.localStorage.notes = JSON.stringify(storage);
    console.log(`#--NOTES HAS BEEN UPDATED--#`)
  };

  stickersUpdate(title, tasks) {
    let storage = this.state.stickersData;

    let date = new Date();
    date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(2)}`;

    storage.push({
      unitId: storage.length + 1,
      unitTitle: title,
      unitTasks: tasks,
      unitDate: date
    })

    this.setState({
      stickersData: storage
    })

    window.localStorage.stickers = JSON.stringify(storage);
    console.log(`#--STICKERS HAS BEEN UPDATED--#`); 
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

  noterWriterMode = () => {
    this.setState({
      noterState: {
        mode: 'input',
        id: '',
        title: '',
        text: ''
      }
    })
  }

  stickerWriterMode = () => {
    this.setState({
      stickerState: {
        mode: 'input',
        id: '',
        title: '',
        tasks: ''
      }
    })
  }

  noterReaderMode = (e) => {
      let storage = JSON.parse(window.localStorage.notes);

      storage.forEach(note => {
        if(note.unitId === Number(e.target.firstChild.innerText)) {
          this.setState({
            noterState: {
              mode: 'read',
              id: note.unitId,
              title: note.unitTitle,
              text: note.unitText
            }
          })
        }
      });
    document.getElementById('screen_blocker').classList.add('active');
    document.getElementById('noter').classList.add('show');
  }

  stickerReaderMode = (e) => {
    let storage = JSON.parse(window.localStorage.stickers);

    storage.forEach(sticker => {
      if(sticker.unitId === Number(e.target.lastChild.innerText)) {
        this.setState({
          stickerState: {
            mode: 'read',
            id: sticker.unitId,
            title: sticker.unitTitle,
            tasks: sticker.unitTasks
          }
        })
      }
    });
    document.getElementById('screen_blocker').classList.add('active');
    document.getElementById('master_sticker').classList.add('show');
  }

    // FIND BETTER SOLUTION
  stickerTaskCheck = (e) => {
    let storage = JSON.parse(window.localStorage.stickers);
    
    storage.forEach(sticker => {
      if(sticker.unitId === Number(document.getElementById('sticker_reader').dataset.stickerId)) {
        sticker.unitTasks.forEach(task => {
          if(task.taskId === e.target.dataset.key) {
            task.done = !task.done;
          }
          
          this.setState({
            stickerState: {
              mode: 'read',
              id: sticker.unitId,
              title: sticker.unitTitle,
              tasks: sticker.unitTasks
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

  deleteNote = (e) => {
      let storage = JSON.parse(window.localStorage.notes);
      let removableUnit = e.target.closest('.note_unit');
      let filteredStorage = storage.filter(note => note.unitId !== Number(removableUnit.firstChild.textContent));
      filteredStorage.forEach(note => note.unitId = filteredStorage.indexOf(note) + 1)
      
      this.setState({
        notesData: filteredStorage
      });

      window.localStorage.notes = JSON.stringify(filteredStorage);
  }

  deleteSticker = (e) => {
    let storage =  JSON.parse(window.localStorage.stickers);
    let removableUnit = e.target.closest('.sticker_unit');

    let filteredStorage = storage.filter(sticker => sticker.unitId !== Number(removableUnit.lastChild.textContent))
    filteredStorage.forEach(sticker => sticker.unitId = filteredStorage.indexOf(sticker) + 1);
    
    this.setState({
      stickersData: filteredStorage
    });

    window.localStorage.stickers = JSON.stringify(filteredStorage);
  }

  render() {
    return (
      <React.Fragment>
        <Controller 
          noterWriterMode={this.noterWriterMode} 
          stickerWriterMode={this.stickerWriterMode} 
          fullCleanUp={this.fullCleanUp}/>
        
        <ModalFields
          notes={{
            noterState: this.state.noterState, 
            notesUpdate: this.notesUpdate
          }} 
          stickers={{
            stickerState: this.state.stickerState, 
            stickersUpdate: this.stickersUpdate, 
            stickerTaskCheck: this.stickerTaskCheck
          }}/>
        
        <Fields 
          notes={{
            notesData: this.state.notesData, 
            noterReaderMode: this.noterReaderMode, 
            deleteNote: this.deleteNote
          }} 
          stickers={{
            stickersData: this.state.stickersData, 
            stickerReaderMode: this.stickerReaderMode, 
            deleteSticker: this.deleteSticker
          }}/>

          <div id="screen_blocker"></div>
      </React.Fragment>
    )
  }
}
