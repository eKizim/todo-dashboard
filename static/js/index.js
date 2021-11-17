//================================
//       TITLE VARIABLES
//================================
const defaultAdder = document.querySelector('#adder__default');

//================================
//          IMPORTS
//================================
import { localStorageUpdate } from './storage.js';
import { Notes_Controller } from './notes.js';
import { Stickers_Controller } from './stickers.js';


//================================
//   LOCAL STORAGE REFRESH
//================================
localStorageUpdate.notesRefresh();
localStorageUpdate.stickersRefresh();


//================================
//  OPEN STICKER OR NOTE CREATOR
//================================
const newNoteButton = document.querySelector('#button__note');
const noteAdder = document.querySelector('#adder__noter');
newNoteButton.addEventListener('click', () => {
     defaultAdder.style.display = 'none';
     noteAdder.style.display = 'flex';
 });
 
const newStickerButton = document.querySelector('#button__sticker');
const stickerAdder = document.querySelector('#adder__sticker');
newStickerButton.addEventListener('click', () => {
    defaultAdder.style.display = 'none';
    stickerAdder.style.display = 'flex';
 });


//================================
//        NOTEBOOK
//================================

/*==============  CREATE A NEW NOTE ================ */
const addButton = document.querySelector('.add__button');
addButton.addEventListener('click', Notes_Controller.add_note);

/* ================ NOTE EVENTS =============== */
const notebookTable = document.querySelector('#notebook__table');
notebookTable.addEventListener('click', (event) => {
    let note = event.target.closest('.note');

    if(!note) return;
    if(!notebookTable.contains(note)) return;

    if(event.target.className === 'up' || event.target.className === 'down') {
        return Notes_Controller.note_order_change(event);
    };

    if(event.target.className === 'edit') {
        return Notes_Controller.edit_note(event);
    };

    if(event.target.className === 'trash') {
        return Notes_Controller.delete_note(event);
    };

    return Notes_Controller.read_note(event);
    }
);


/* ================ NOTE EVENTS =============== */
/* FIX -- Create button component */
const readerBackButton = document.querySelector('.reader__button');
const noteReader = document.querySelector('#adder__reader');
readerBackButton.addEventListener('click', () => {
    noteReader.style.display = 'none';
    defaultAdder.style.display = 'flex';
});

const backButton = document.querySelector('.back__button');
backButton.addEventListener('click', () => {
    if(noteAdder.style.display == 'flex') {
        noteAdder.style.display = 'none';
        defaultAdder.style.display = 'flex';

        const adderTitle = document.querySelector('.title');
        const adderText = document.querySelector('.textarea');
        adderTitle.value = '';
        adderText.value = '';
    }

    const editButton = document.querySelector('.edit__button');
    if(editButton.style.display == 'flex') {
        editButton.style.display = 'none';
        addButton.style.display = 'flex';
    }
});



//================================
//        STICKERS
//================================

/* ================ CREATE A NEW STICKER =============== */
const addStickerButton = document.querySelector('.add-sticker__button');
addStickerButton.addEventListener('click', Stickers_Controller.add_sticker);

/* ================ CREATE STICKER TASK =============== */
const createTaskButton = document.querySelector('.create__task');
createTaskButton.addEventListener('click', Stickers_Controller.create_sticker_task);


/* ============= STICKER BACK BUTTON AND CLEANING ===================*/ 
/* FIXME -- Make general button or button creator */
const stickerBackButton = document.querySelector('.sticker-back__button');
stickerBackButton.addEventListener('click', () => {
    if(stickerAdder.style.display == 'flex') {
        stickerAdder.style.display = 'none';
        defaultAdder.style.display = 'flex';

        const stickerTitle = document.querySelector('.sticker__title');
        const stickerList = document.querySelector('.sticker__list');
        const stickerText = document.querySelector('.sticker__text');
        stickerTitle.value = '';
        stickerList.innerHTML = '';
        stickerText.value = '';
    }
}); 

const stickerReaderButton = document.querySelector('.sticker-reader-back__button');
const stickerReader = document.querySelector('#sticker__reader');
stickerReaderButton.addEventListener('click', () => {
    if(stickerReader.style.display == 'flex') {
        stickerReader.style.display = 'none';
        defaultAdder.style.display = 'flex';
    }
});

/* ============== STICKER EVENTS ================ */
const STICKERS = document.querySelector('#stickers');
STICKERS.addEventListener('click', (event) => {
    let sticker = event.target.closest('.sticker');

    if(!sticker) return;
    if(!STICKERS.contains(sticker)) return;
    
    if(event.target.className === 'sticker__delete') return Stickers_Controller.delete_sticker(event);

    return Stickers_Controller.read_sticker(event);
});


/* ============EDIT STICKER TITLE ============== */
const editStickerReaderTitle = document.querySelector('.edit__sticker-reader__title');
editStickerReaderTitle.addEventListener('click', (event) => {
    return Stickers_Controller.edit_sticker_title(event);
});


/* ============= STICKER TASK EVENTS =============== */
const taskList = document.querySelector('.task__list');
taskList.addEventListener('click', (event) => {
    let task = event.target.closest('.task');
    let li = task.querySelector('li');

    if(!task) return;
    if(!taskList.contains(task)) return;

    // FIX -- Task is null error while edit
    if(event.target.className == 'task__edit') return Stickers_Controller.sticker_task_edit(event);
    if(event.target.className == 'task__delete') return Stickers_Controller.sticker_task_delete(event);

    return Stickers_Controller.sticker_task_checker(li);
});



/* =============== ADD STICKER TASK =============== */
const addTask = document.querySelector('.add__task');

addTask.addEventListener('click', Stickers_Controller.sticker_task_add);