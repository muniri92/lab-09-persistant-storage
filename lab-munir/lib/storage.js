'use strict';

const uuid = require('uuid');
const fs = require('fs-extra');

let storage = module.exports = {};

storage.setItem = (data) => {
  data.id = uuid.v1();

  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

storage.fetchItem = (id) => {
  let file = `${__dirname}/../data/${id}`;

  return fs.readJson(file)
  .then((packageObj) => {
    if (packageObj)
      return Promise.resolve(packageObj);
    return Promise.reject(new Error('not found'));
  });
};

storage.updateItem = (data) => {
  let file = `${__dirname}/../data/${data.id}`;

  return fs.pathExists(file)
  .then((exists) => {
    console.log('EXIST: ', exists);
    if (exists)
      return exists;
    return Promise.reject(new Error('not found'));
  })
  .then(() => {
    return fs.writeJson(file, data);
  })
  .then(() => {
    return Promise.resolve(data);
  });
  // .catch((err) => {
  //   console.log('ERROR: ', err);
  // });


};
//
// storage.deleteItem = (id) => {
//
// };
