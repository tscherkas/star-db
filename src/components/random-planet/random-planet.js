import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css'

export default class RandomPlanet extends Component {

  constructor() {
    super();

    this.onPlanetLoaded = (planet) => {
      this.setState({
        planet,
        isLoading: false
      });
    }

    this.onError = (err) => {
      this.setState({
        isError: true,
        isLoading: false
      });
    }

    this.updatePlanet = () => {
      const id = Math.floor(Math.random()*25)+3;
      this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
      }
  }

  swapiService = new SwapiService();

  state = {
    planet: {},
    isLoading: true,
    isError: false
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval =  setInterval(this.updatePlanet, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const { planet, isLoading, isError } = this.state;

    const hasData = ! (isLoading || isError);

    const errorMessage = isError ? <ErrorIndicator /> : null;
    const spinner = isLoading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={ planet }/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
           alt={ name }/>
      <div>
        <h4>{ name }</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{ population }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation period</span>
            <span>{ rotationPeriod }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diametr</span>
            <span>{ diameter }</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
