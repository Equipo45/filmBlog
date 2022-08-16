import express from "express";

import MoviesController from "../controllers/movies.controller.js";
import ReviewsController from "../controllers/reviews.controller.js";

const router = express.Router();

//Cada vez que haya una llamada a /api/v1/movies , ejecutaremos al respuesta de apiGetMovie

router.route("/")
    .get(MoviesController.apiGetMovie);
router.route("/id/:id")
    .get(MoviesController.apiGetMovieById)
router.route("/ratings")
    .get(MoviesController.apiGetRatings)
  
router.route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router;
