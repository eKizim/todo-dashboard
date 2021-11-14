const fs = require('fs');
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
   fs.readFile(path.join(__dirname, './data/data.json'), 'utf-8', (err, data) => {
      if(err) console.log(err);
      
      let storage = JSON.parse(data);

      window.localStorage.notes = JSON.stringify(storage.notes);
      window.localStorage.stickers = JSON.stringify(storage.stickers);
   }) 
})

window.addEventListener('beforeunload', () => {
    let notes = window.localStorage.notes ? JSON.parse(window.localStorage.notes) : [];
    let stickers = window.localStorage.stickers ? JSON.parse(window.localStorage.stickers) : [];

    let storage = {
        notes: notes,
        stickers: stickers
    }

    let data = JSON.stringify(storage, null, 4);
    fs.writeFile(path.join(__dirname, './data/test.json'), data, (err) => {
        if(err) console.log(err);
    })
})