class Person {
  constructor(name) {
    this.name = name;
  }

  sayMyName() {
    return `hello, My name is ${this.name}!`;
  }
}

module.exports = {
  Person,
};
