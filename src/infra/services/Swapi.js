import axios from "axios";
import BadGatewayError from "interfaces/http/errors/BadGatewayError";

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
}

export default Swapi;
