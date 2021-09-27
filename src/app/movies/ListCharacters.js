import UseCase from "app/UseCase";

class ListCharacters extends UseCase {
  constructor({ swapi, Character }) {
    super();
    this.swapi = swapi;
    this.Character = Character;
  }

  /**
   * Retrieves the list of characters for a movie
   * @param {Object} payload
   * @param {Number} payload.movieId - Movie id
   * @param {String} payload.sortBy - Field to sort by
   * @param {String} payload.order - Sorting order
   * @param {String} payload.gender - Filter by gender
   * @returns Promise<Object>
   */
  async execute({
    movieId,
    sortBy,
    order,
    gender,
  }) {
    let characters = await this.swapi.getCharacterList(movieId);
    if (gender) {
      characters = characters.filter((el) => el.gender === gender);
    }
    if (sortBy) {
      characters = characters.sort((a, b) => {
        const fieldInA = sortBy === "height" ? Number(a[sortBy]) : a[sortBy];
        const fieldInB = sortBy === "height" ? Number(b[sortBy]) : b[sortBy];

        if (fieldInA === fieldInB) {
          return 0;
        }

        if (fieldInA < fieldInB) {
          return order === "asc" ? 1 : -1;
        }
        return order === "asc" ? -1 : 1;
      });
    }
    const totalHeightInCM = characters.reduce((acc, cur) => acc + Number(cur.height), 0);
    const totalHeightInFeet = this.Character.getHeightInFeet(totalHeightInCM);
    const totalHeightInInches = this.Character.getHeightInInches(totalHeightInCM);
    const metadata = {
      totalCount: characters.length,
      totalHeightInCM,
      totalHeightInFeet,
      totalHeightInInches,
    };
    return {
      characters,
      metadata,
    };
  }
}

export default ListCharacters;
