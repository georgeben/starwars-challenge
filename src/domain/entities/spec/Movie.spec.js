import { expect } from "chai";
import dayjs from "dayjs";
import sampleList from "test/samples/movies-list.json";
import Movie from "../Movie";

describe("********** Movie entity ***********", () => {
  it("formatMovies", () => {
    const movie = new Movie();
    const sampleComments = [
      {
        movieId: 1,
      },
    ];
    const formattedList = movie.formatMovies(sampleList, sampleComments);

    // Test for type
    expect(formattedList).to.be.an("array");
    expect(formattedList.length).to.equal(sampleList.length);

    // Test properties
    expect(formattedList[0]).to.have.property("title");
    expect(formattedList[0]).to.have.property("episode_id");
    expect(formattedList[0]).to.have.property("opening_crawl");
    expect(formattedList[0]).to.have.property("release_date");
    expect(formattedList[0]).to.have.property("numberOfComments");
    expect(formattedList[0].numberOfComments).to.equal(1);

    // Test for order (earliest to newest)
    expect(
      dayjs(formattedList[0].release_date).isBefore(
        formattedList[1].release_date,
      ),
    ).to.equal(true);
  });
});
