import UseCase from "app/UseCase";

class ListMovies extends UseCase {
  constructor({ swapi, Movie, getAllComments }) {
    super();
    this.swapi = swapi;
    this.Movie = Movie;
    this.getAllComments = getAllComments;
  }

  /**
   * List starwars movies
   */
  async execute() {
    const response = await this.swapi.getFilms();
    const comments = await this.getAllComments.execute();
    const movies = this.Movie.formatMovies(response.results, comments);
    return {
      movies,
      count: response.count,
    };
  }
}

export default ListMovies;
