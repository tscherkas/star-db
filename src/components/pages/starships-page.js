import React, { Component } from "react";
import Row from '../row';
import {StarshipList, StarshipDetails} from "../sw-components";

export default class StarshipsPage extends Component {
  state = {
    selectedStarship: null
  }

  onStarshipSelected = (selectedStarship) => {
    this.setState({
      selectedStarship
    });
  }

  render() {
    return (
      <Row left={ <StarshipList onItemSelected={ this.onStarshipSelected }/> }
        right={ <StarshipDetails selectedItem={ this.state.selectedStarship }/> } />
       );
  }
}
