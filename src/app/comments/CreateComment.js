import UseCase from "app/UseCase";
import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";

class CreateComment extends UseCase {
  constructor({ swapi, db }) {
    super();
    this.swapi = swapi;
    this.CommentModel = db.Comment;
  }

  /**
   * Creates a comment
   * @param {Object} payload
   * @param {Number} payload.movieId - movieId being commented on
   * @param {String} payload.content - Content of the comment
   * @param {String} payload.ipAddress - IP Address of user
   * @returns Promise<Comment>
   */
  async execute({
    movieId,
    content,
    ipAddress,
  }) {
    const movie = await this.swapi.getFilm(movieId);
    if (!movie) {
      throw new ResourceNotFoundError("The movie you specified was not found");
    }
    const comment = await this.CommentModel.create({
      movieId,
      content,
      ipAddress,
    });
    return comment;
  }
}

export default CreateComment;
