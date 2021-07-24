import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import TogglePlanet from '../toggle-planet';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedPerson: 11,
    hasError: false
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

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    });
  }

  render(){
    const { showRandomPlanet, selectedPerson, hasError } = this.state;

    if(hasError){
      return <ErrorIndicator />
    }

    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null;
/**


<div className="row mb2">
  <div className="col-lg-4">
    <ItemList onItemSelected={ this.onPersonSelected }/>
  </div>
  <div className="col-lg-8 d-flex justify-content-center align-items-center">
    <PersonDetails selectedPerson={ selectedPerson }/>
  </div>
</div>



*/

    return (
      <div className="app container">
        <Header />
        { randomPlanet }
        <TogglePlanet onClick={ this.onTogglePlanet }/>
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
}
