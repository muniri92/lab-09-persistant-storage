'use strict';

const router = require('../lib/router.js');

const Note = require('../model/note.js');

router.post('/api/notes', (req, res) => {
  console.log('Hit POST request at /api/notes');
  console.log(req.body);
  if (!req.body.content)
    return res.sendStatus(400);

  new Note(req.body)
  .save()
  .then((note) => res.sendJSON(200, note))
  .catch((err) => res.sendStatus(500));
});


router.get('/api/notes', (req, res) => {
  if (!req.url.query.id)
    return res.sendStatus(400);
  console.log('hey');
  Note.findById(req.url.query.id)
  .then(note => {
    console.log('NOTE: ', note);
    res.sendJSON(200, note);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  });
});

router.put('/api/notes', (req, res) => {
  if (!req.body.content)
    return res.sendStatus(400);

  new Note(req.body)
  .update()
  .then(note => {
    res.sendJSON(200, note);
  })
  .catch(() => {
    res.sendStatus(404);
  });
});
