class Character {
  getHeightInFeet(value) {
    return (value * 0.0328084).toFixed(2);
  }

  getHeightInInches(value) {
    return (value * 0.393701).toFixed(2);
  }
}

export default Character;
