import axios from "axios";
import BadGatewayError from "interfaces/http/errors/BadGatewayError";
import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";

class Swapi {
  constructor() {
    const httpClient = axios.create({
      baseURL: "https://swapi.dev/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.httpClient = httpClient;
  }

  async getFilms() {
    const response = await this.httpClient.get("/films/");
    const films = response.data;
    return films;
  }

  async getFilm(id) {
    try {
      const response = await this.httpClient.get(`/films/${id}`);
      const film = response.data;
      return film;
    } catch (error) {
      if (error.isAxiosError) {
        if (error.response && error.response.status === 404) {
          return null;
        }
      }
      throw new BadGatewayError("Please cannot complete your request at the moment");
    }
  }

  async getCharacterList(filmId) {
    const film = await this.getFilm(filmId);
    if (!film) {
      throw new ResourceNotFoundError("The movie you specified was not found");
    }
    const characterRequests = film.characters.map((url) => axios.get(url));
    const charactersResponse = await Promise.all(characterRequests);
    const characters = charactersResponse.map((el) => el.data);
    return characters;
  }
}

export default Swapi;
