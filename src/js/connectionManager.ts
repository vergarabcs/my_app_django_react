class ConnectionManager {
  name: string;
  specie: string;
  constructor(name: string, specie: string) {
      this.name = name;
      this.specie = specie;
  }
  sing() {
      return `${this.name} can sing`;
  }
  dance() {
      return `${this.name} can dance`;
  }
}

export default ConnectionManager;