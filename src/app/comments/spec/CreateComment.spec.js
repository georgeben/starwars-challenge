import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import CreateComment from "../CreateComment";

chai.use(chaiAsPromised);

describe("********* Create comment usecase ********", () => {
  it("create comment successfully", async () => {
    const swapi = {
      getFilm: () => Promise.resolve({ title: "Hi" }),
    };
    const db = {
      Comment: {
        create: (payload) => Promise.resolve(payload),
      },
    };
    const useCase = new CreateComment({ swapi, db });
    const payload = {
      movieId: 6,
      content: "You no fit kill my vibe",
      ipAddress: "192.71.0.1",
    };
    const result = await useCase.execute(payload);
    expect(result).to.be.an("object");
    expect(result).to.have.property("movieId");
    expect(result).to.have.property("content");
    expect(result).to.have.property("ipAddress");

    expect(result.content).to.equal(payload.content);
  });

  it("movie not found", () => {
    const swapi = {
      getFilm: () => Promise.resolve(null),
    };
    const db = {
      Comment: {
        create: (payload) => Promise.resolve(payload),
      },
    };
    const useCase = new CreateComment({ swapi, db });
    const payload = {
      movieId: 6,
      content: "You no fit kill my vibe",
      ipAddress: "192.71.0.1",
    };
    return expect(useCase.execute(payload)).to.eventually.be.rejectedWith(
      "The movie you specified was not found",
    );
  });
});
