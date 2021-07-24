import React, { Component } from "react";
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import SwapiService from '../../services/swapi-service';

import "./people-page.css";

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 11
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  }


  render () {
    const { selectedPerson } = this.state;


    const itemList = (
      <ItemList onItemSelected={ this.onPersonSelected }
        getData={ this.swapiService.getAllPeople }>
        {
          (i) => `${ i.name }, (${ i.birthYear })`
        }
      </ItemList>
    );
    const personDetails = (
      <ErrorBoundry>
        <ItemDetails selectedItem={ selectedPerson }/>
      </ErrorBoundry>
    );
    const x = <Row left = { itemList }  right = { personDetails } />

    return (
        <Row left= {itemList} right = {personDetails} />
    );
  }
}
