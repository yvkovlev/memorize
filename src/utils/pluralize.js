class Pluralize {
  constructor(nominative, genitive, pluralGenitive) {
    this.nominative = nominative;
    this.genitive = genitive;
    this.pluralGenitive = pluralGenitive;
  }

  getNoun(number) {
    let n = Math.abs(number);

    n %= 100;
    if (n >= 5 && n <= 20) {
      return this.pluralGenitive;
    }

    n %= 10;
    if (n === 1) {
      return this.nominative;
    }
    if (n >= 2 && n <= 4) {
      return this.genitive;
    }

    return this.pluralGenitive;
  }
}

export default Pluralize;
