import dayjs from "dayjs";

class Movie {
  formatMovies(movies, comments) {
    const formattedResponse = movies
      .sort((a, b) => {
        if (dayjs(a.release_date).isBefore(b.release_date)) {
          return -1;
        }
        return 1;
      })
      .map((el) => {
        const movieUrl = new URL(el.url);
        const movieId = movieUrl.pathname.split("films/")[1][0];
        return {
          title: el.title,
          episode_id: el.episode_id,
          opening_crawl: el.opening_crawl,
          release_date: el.release_date,
          numberOfComments: comments.filter((comment) => comment.movieId === Number(movieId)).length,
        };
      });

    return formattedResponse;
  }
}

export default Movie;
