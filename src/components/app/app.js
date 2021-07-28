import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from "../swapi-service-context";

import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedPerson: 11,
    swapiService: new SwapiService()
  }

  constructor() {
    super();

    this.onTogglePlanet = () => {
      this.setState(state => {
        return {
          showRandomPlanet: !state.showRandomPlanet
        };
      });
    }
  }

  onServiceChange = () => {
    const Service = this.state.swapiService instanceof SwapiService ?
      DummySwapiService : SwapiService;

    this.setState({
      swapiService: new Service()
    });
  }

  render(){
    return (
      <div className="app container">
        <ErrorBoundry>
          <SwapiServiceProvider value={ this.state.swapiService }>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />
          </SwapiServiceProvider>
        </ErrorBoundry>
      </div>
    );
  }
}
