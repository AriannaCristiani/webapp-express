const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

//ROTTA INDEX
router.get('/', moviesController.index);

//ROTTA SHOW
router.get('/:id', moviesController.show);

//ROTTA STORE REVIEWS
router.post('/:id/reviews', moviesController.storeReviews)

//ROTTA STORE FILMS
router.post('/:id/movies', moviesController.storeFilms)

module.exports = router