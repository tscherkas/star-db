export default class SwapiService {
  constructor(){
    this.getResource = async (url) => {
      const res = await fetch(`${this._apibase}${url}`);
      if(!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`);
      }
      const body = await res.json();
      return body;
    }

    this.getAllPeople = async () => {
      const res = await this.getResource(`/people/`);
      return res.results.map(this._transformPerson);
    }

    this.getPerson = async (id) => {
      const person = await this.getResource(`/people/${id}`);
      return this._transformPerson(person);
    }

    this.getAllPlanets = async () => {
      const res = await this.getResource(`/planets/`);
      return res.results.map(this._transformPlanet);
    }

    this.getPlanet = async (id) => {
      const planet = await this.getResource(`/planets/${id}`);
      return this._transformPlanet(planet);
    }

    this.getAllStarships = async () => {
      const res = await this.getResource(`/starships/`);
      return res.results.map(this._transformStarship);
    }

    this.getStarship = async (id) => {
      const starship = await this.getResource(`/starships/${id}`);
      return this._transformStarship(starship);
    }

    this.getPersonImage = ({id}) => {
      return `${this._imageBase}/characters/${id}.jpg`;
    }

    this.getStarshipImage = ({id}) => {
      return `${this._imageBase}/starships/${id}.jpg`;
    }

    this.getPlanetImage = ({id}) => {
      return `${this._imageBase}/planets/${id}.jpg`;
    }
  }

  _extractId(item) {
      const regexp = /\/([\d]+)\/$/;
      return parseInt(item.url.match(regexp)[1]);
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      lenght: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _apibase = "https://swapi.dev/api";
  _imageBase = "https://starwars-visualguide.com/assets/img"
}
