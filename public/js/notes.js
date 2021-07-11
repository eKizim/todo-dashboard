//================================
//         IMPORTS
//================================
import { localStorageUpdate } from './storage.js';
import { ADDER, defaultAdder } from './index.js';
//=============================================================

// NOTEBOOK
export const notebookTable = document.querySelector('#notebook__table');
export const counter = document.querySelector('#counter');

/* ==========NOTE BUTTONS========== */
const upButtons = document.querySelectorAll('.up');
const downButtons = document.querySelectorAll('.down');
const editNoteButtons = document.querySelectorAll('.edit');
const trashButtons = document.querySelectorAll('.trash');

/* ==========NOTE ADDER========== */
export const noteAdder = document.querySelector('#adder__noter');
const adderTitle = document.querySelector('.title');
const adderText = document.querySelector('.textarea');
export const addButton = document.querySelector('.add__button');
export const backButton = document.querySelector('.back__button');
export const editButton = document.querySelector('.edit__button');

/* ==========NOTE READER========== */ 
export const noteReader = document.querySelector('#adder__reader');
const readerTitle = document.querySelector('#reader__title');
const readerText = document.querySelector('#reader__text');
export const readerBackButton = document.querySelector('.reader__button');
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

    
    read__note(_event) {
        let note = _event.target.closest('.note');
        let tempObj = JSON.parse(localStorage.getItem('notes'));
         
        for(let obj of tempObj) {
            if(`index-${obj.id}` === note.id) {
 
                Object.values(ADDER.children).forEach(field => {
                    if(field.id != 'adder__reader') {
                        field.style.display = 'none';
                    };
                });
 
                noteReader.style.display = 'flex';
                readerTitle.textContent = obj.title;
                readerText.textContent = obj.text;
            };
        };
    },

   
    note__orderChange(_event) {
        let note = _event.target.closest('.note');
        let tempObj = JSON.parse(localStorage.getItem('notes'));
 
        if(_event.target.className === 'up') {
            tempObj.forEach(obj => {
                if(`index-${obj.id}` === note.id && obj.id !== 1) {
                    tempObj[obj.id - 2].id = obj.id;
                    obj.id = obj.id - 1;
 
                    tempObj.sort((a, b) => b.id < a.id);
                 
                    localStorage.setItem('notes', JSON.stringify(tempObj));
                    localStorageUpdate.notesRefresh();
                }
            });
 
        } else if(_event.target.className === 'down') {
            tempObj.forEach(obj => {
                if(`index-${obj.id}` === note.id && obj.id !== tempObj.length) {
                    tempObj[obj.id].id = obj.id;
                    obj.id = obj.id + 1;
 
                    tempObj.sort((a, b) => b.id < a.id);
                 
                    localStorage.setItem('notes', JSON.stringify(tempObj));
                    localStorageUpdate.notesRefresh();
                }
            });
        };
    },

    edit__note(_event) {
        let note = _event.target.closest('.note');
        let tempObj = JSON.parse(localStorage.getItem('notes'));
 
        for(let obj of tempObj) {
            if(`index-${obj.id}` === note.id) {
                adderTitle.value = obj.title;
                adderText.value = obj.text;
 
                Object.values(ADDER.children).forEach(field => {
                    if(field.id != 'adder__noter') {
                        field.style.display = 'none';
                    };
                });
             
                addButton.style.display = 'none';
                editButton.style.display = 'flex';
 
                noteAdder.style.display = 'flex';
 
                editButton.onclick =  function() {
                     obj.title = adderTitle.value;
                     obj.text = adderText.value;
 
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
        }
    },

    delete__note(_event) {
        let approve = confirm('Are you sure?');
 
        if(approve) {
            let note = _event.target.closest('.note');
            let tempObj = JSON.parse(localStorage.getItem('notes'));
 
            tempObj.forEach(obj => {
                if(`index-${obj.id}` === note.id) {
                    tempObj.splice(obj.id - 1, 1);
 
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
