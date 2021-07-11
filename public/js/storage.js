import { notebookTable, counter } from "./notes.js";
import { STICKERS } from "./stickers.js";

export const localStorageUpdate = {
    
     notesRefresh() {
         if(!localStorage.getItem('notes')) {
             return localStorage.setItem('notes', JSON.stringify([]));
         }
         
         let notes = JSON.parse(localStorage.getItem('notes'));
 
         notebookTable.innerHTML = '';

         if(notes.length !== 0){
             for(let note of notes) {
                 notebookTable.innerHTML += `<div id="index-${note.id}" class="note">
                                                 <div class="note__title">
                                                     <p class="note__counter">${note.id}</p>
                                                     <h6 class="note__inner-title">${note.title}</h6>
                                                 </div>
                                                 <p class="note__date">${note.date}</p>
                                                 <div class="note__buttons">
                                                     <button class="up"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                                     <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                                   </svg></button>
 
                                                     <button class="down"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                                     <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                                   </svg></button>
                                                     <button class="edit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                                     <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                                   </svg></button>
                                                     <button class="trash"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                     <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                   </svg></button>
                                                 </div>
                                             </div>`; 
             } 
         } 
         
         counter.textContent = notes.length;
     },
 
     stickersRefresh() {
         if(!localStorage.getItem('stickers')) {
             return localStorage.setItem('stickers', JSON.stringify([]));
         }
 
         let stickers = JSON.parse(localStorage.getItem('stickers'));
 
         STICKERS.innerHTML = '';
 
         if(stickers.length !== 0) {
         for(let sticker of stickers){
             STICKERS.innerHTML += `<div id="index-${sticker.id}"class="sticker">
                                         <div class="sticker__header">
                                             <p class="sticker__date">${sticker.date}</p>
                                             <button class="sticker__delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                             <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                           </svg></button>
                                         </div>
                                         <h6 class="sticker__name">#${sticker.title}</h6>
                                     </div>`
             }
         }
     },
 };


 

