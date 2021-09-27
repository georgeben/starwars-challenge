import { expect } from "chai";
import Character from "../Character";

describe("********** Character entity *********", () => {
  it("getHeightInFeet", () => {
    const character = new Character();
    expect(character.getHeightInFeet(1)).to.equal("0.03");
  });

  it("getHeightInInches", () => {
    const character = new Character();
    expect(character.getHeightInInches(1)).to.equal("0.39");
  });
});
