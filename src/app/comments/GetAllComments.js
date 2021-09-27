import UseCase from "app/UseCase";

class GetAllComments extends UseCase {
  constructor({ db }) {
    super();
    this.CommentModel = db.Comment;
  }

  /**
   * Retrieves the list of comments from the db
   * @param {*} query - WHERE clause
   */
  async execute(query = {}) {
    return this.CommentModel.findAll({
      where: query,
      order: [["createdAt", "DESC"]],
      raw: true,
    });
  }
}

export default GetAllComments;
