//================================
//         IMPORTS
//================================
import { localStorageUpdate } from './storage.js';
//=============================================================

const ADDER = document.querySelector('#adder');
const defaultAdder = document.querySelector('#adder__default');

// NOTEBOOK
const notebookTable = document.querySelector('#notebook__table');

/* ==========NOTE ADDER========== */
const noteAdder = document.querySelector('#adder__noter');
const adderTitle = document.querySelector('.title');
const adderText = document.querySelector('.textarea');
const addButton = document.querySelector('.add__button');
const editButton = document.querySelector('.edit__button');

/* ==========NOTE READER========== */ 
const noteReader = document.querySelector('#adder__reader');
const readerTitle = document.querySelector('#reader__title');
const readerText = document.querySelector('#reader__text');
//=============================================================



export const Notes_Controller = {
    
    add_note() {
        let newDate = new Date();
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
 
        if(day.toString().length != 2) {
            day = `0${day}`;
        };
 
        if(month.toString().length != 2) {
            month = `0${month}`;
        }
 
        let noteDate = `${day}:${month}:${year}`;
 
        if(adderTitle.value && adderText.value) {
            let tempObj = JSON.parse(localStorage.getItem('notes'));
         
            let storageObj = {
                id: tempObj.length + 1,
                title: adderTitle.value, 
                text: adderText.value, 
                date: noteDate,
            };
 
            tempObj.push(storageObj);
            localStorage.setItem('notes', JSON.stringify(tempObj));
 
            localStorageUpdate.notesRefresh();
 
            adderTitle.value = '';
            adderText.value = '';
            noteAdder.style.display = 'none';
            defaultAdder.style.display = 'flex';
        };
    },

    
    read_note(_event) {
        let note = _event.target.closest('.note');
        let tempObj = JSON.parse(localStorage.getItem('notes'));
         
        tempObj.find(item => {
            if(item.id == note.id.slice(-1)) {

                Object.values(ADDER.children).forEach(field => {
                    if(field.id != 'adder__reader') {
                        field.style.display = 'none';
                    };
                });
 
                noteReader.style.display = 'flex';
                readerTitle.textContent = item.title;
                readerText.textContent = item.text;

            };
        }); 
    },

   
    note_order_change(_event) {
        let note = _event.target.closest('.note');
        let tempObj = JSON.parse(localStorage.getItem('notes'));
 
        if(_event.target.className === 'up') {
            tempObj.find(obj => {

                /* Destructurization? */
                if(obj.id == note.id.slice(-1) && obj.id !== 1) {
                    tempObj[obj.id - 2].id = obj.id;
                    obj.id = obj.id - 1;
 
                    tempObj.sort((a, b) => b.id < a.id);
                 
                    localStorage.setItem('notes', JSON.stringify(tempObj));
                    localStorageUpdate.notesRefresh();
                }
            });
 
        } else if(_event.target.className === 'down') {
            tempObj.find(obj => {

                /* Destructurization? */
                if(obj.id == note.id.slice(-1) && obj.id !== tempObj.length) {
                    tempObj[obj.id].id = obj.id;
                    obj.id = obj.id + 1;
 
                    tempObj.sort((a, b) => b.id < a.id);
                 
                    localStorage.setItem('notes', JSON.stringify(tempObj));
                    localStorageUpdate.notesRefresh();
                }
            });
        };
    },

    edit_note(_event) {
        let note = _event.target.closest('.note');
        let tempObj = JSON.parse(localStorage.getItem('notes'));
 
        tempObj.find(item => {
            if(item.id == note.id.slice(-1)) {
                adderTitle.value = item.title;
                adderText.value = item.text;
 
                Object.values(ADDER.children).forEach(field => {
                    if(field.id != 'adder__noter') {
                        field.style.display = 'none';
                    };
                });
             
                addButton.style.display = 'none';
                editButton.style.display = 'flex';
 
                noteAdder.style.display = 'flex';
 
                editButton.onclick = () => {
                     item.title = adderTitle.value;
                     item.text = adderText.value;
 
                     adderTitle.value = '';
                     adderText.value = '';
 
                     noteAdder.style.display = 'none';
                     defaultAdder.style.display = 'flex';
 
                    editButton.style.display = 'none';
                    addButton.style.display = 'flex';
 
                    localStorage.setItem('notes', JSON.stringify(tempObj));
                    localStorageUpdate.notesRefresh();
                }
            }    
        });
    },

    delete_note(_event) {
        let approve = confirm('Are you sure?');
 
        if(approve) {
            let note = _event.target.closest('.note');
            let tempObj = JSON.parse(localStorage.getItem('notes'));
 
            tempObj.find(item => {
                if(item.id == note.id.slice(-1)) {
                    tempObj.splice(item.id - 1, 1);
                
                    for(let i = 0; i <= tempObj.length; i++) {
                        if(!tempObj[i]) continue;
                        tempObj[i].id = i + 1;
                    };
 
                    if(noteReader.style.display != 'none') {
                        noteReader.style.display = 'none';
                        defaultAdder.style.display = 'flex';
                    };
 
                    localStorage.setItem('notes', JSON.stringify(tempObj));
                    localStorageUpdate.notesRefresh();
                };
            })
        }
    },
};