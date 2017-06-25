'use strict';

const storage = require('../lib/storage.js');

class Note {
  constructor(data) {
    this.content = data.content;
    this.id = data.id;
  }

  save() {
    console.log('Inside save method of Note class: ', this);
    return storage.setItem(this);
  }

  update() {
    return storage.updateItem(this);
  }

}

Note.findById = (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return data;
  });
};

module.exports = Note;
