const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

//ROTTA INDEX
router.get('/', moviesController.index);

//ROTTA SHOW
router.get('/:id', moviesController.show);

//ROTTA STORE
router.post('/:id/reviews', moviesController.store)

module.exports = router