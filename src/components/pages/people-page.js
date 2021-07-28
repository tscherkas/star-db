import React, { Component } from "react";
import Row from '../row';
import {PeopleList, PersonDetails} from "../sw-components";

export default class PeoplePage extends Component {
  state = {
    selectedPerson: null
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson
    });
  }

  render() {
    return (
      <Row left={ <PeopleList onItemSelected={ this.onPersonSelected }/> }
        right={ <PersonDetails selectedItem={ this.state.selectedPerson }/> } />
       );
  }
}
