import React, { Component } from "react";
import Row from '../row';
import {PlanetList, PlanetDetails} from "../sw-components";

export default class PlanetsPage extends Component {
  state = {
    selectedPlanet: null
  }

  onPlanetSelected = (selectedPlanet) => {
    this.setState({
      selectedPlanet
    });
  }

  render() {
    return (
      <Row left={ <PlanetList onItemSelected={ this.onPlanetSelected }/> }
        right={ <PlanetDetails selectedItem={ this.state.selectedPlanet }/> } />
       );
  }
}
