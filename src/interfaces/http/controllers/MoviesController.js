import BaseController from "./BaseController";

class MoviesController extends BaseController {
  constructor({
    listMovies,
    createComment,
    getAllComments,
    listCharacters,
  }) {
    super();
    this.listMovies = listMovies;
    this.createComment = createComment;
    this.getAllComments = getAllComments;
    this.listCharacters = listCharacters;
  }

  async getAll(req, res) {
    const result = await this.listMovies.execute();

    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(result, "Successfully fetched all movies");
  }

  async postComment(req, res) {
    const { id: movieId } = req.params;
    const { clientIp } = req;
    const { content } = req.body;

    const comment = await this.createComment.execute({
      movieId,
      ipAddress: clientIp,
      content,
    });
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(
        { comment },
        "Successfully posted comment",
        this.responseBuilder.HTTP_STATUS.CREATED,
      );
  }

  async getComments(req, res) {
    const comments = await this.getAllComments.execute({
      movieId: req.params.id,
    });
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess({ comments }, "Successfully fetched comments");
  }

  async getCharacterList(req, res) {
    const movieId = req.params.id;
    const response = await this.listCharacters.execute({
      movieId,
      ...req.query,
    });
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, "Successfully retrieved list of characters");
  }
}

export default MoviesController;
