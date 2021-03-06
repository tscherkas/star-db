import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PropTypes from "prop-types";

import './random-planet.css'

export default class RandomPlanet extends Component {
  static defaultProps = {
    interval: 2500
  }

  static propTypes = {
    interval: PropTypes.number
  }

  constructor() {
    super();

    this.onPlanetLoaded = (planet) => {
      this.setState({
        planet,
        isLoading: false,
        isRequesting: false
      });
    }

    this.onError = (err) => {
      this.setState({
        isError: true,
        isLoading: false,
        isRequesting: false
      });
    }

    this.updatePlanet = () => {
      if(!this.state.isRequesting){

        this.setState({
          isRequesting: true
        });

        const id = Math.floor(Math.random()*25)+3;
        this.swapiService
          .getPlanet(id)
          .then(this.onPlanetLoaded)
          .catch(this.onError);
        }
      }
  }

  swapiService = new SwapiService();

  state = {
    planet: {},
    isLoading: true,
    isError: false,
    isRequesting: false
  };

  componentDidMount() {
    const { interval } = this.props;
    this.updatePlanet();
    this.interval =  setInterval(this.updatePlanet, interval);
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
