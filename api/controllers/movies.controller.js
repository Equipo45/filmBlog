import MoviesDAO from "../../dao/moviesDAO.js";

//Los controladores sirver para utilizar los datos cargados en las DAO, de esta manera
//En este caso es para establecer la conexion http y mandar los datos correctos
export default class MoviesController {
  static async apiGetMovie(req, res, next) {
    //la query no es otra cosa coger el dato /search?moviesPerPage=tobi+ferret
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage)
      : 20;

    const page = req.query.page ? parseInt(req.query.page) : 0;
    let filters = {};
    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { movieList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    let response = {
      movies: movieList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    res.json(response);
  }

  static async apiGetMovieById(req, res, next) {
    try {
      let id = req.params.id || {};
      let movie = await MoviesDAO.getMoviesById(id);
      if (!movie) {
        res.status(404).json({ error: "Not found" });
      }
      res.json(movie);
    } catch (e) {
      console.log(`Api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRatings(req, res, next) {
    try {
      let propertyTypes = await MoviesDAO.getRatings();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`Api,${e}`);
      res.status(500).json({ error: e });
    }
  }
}
