import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorCreator from "../error-creator";

import './item-details.css';

export default class ItemDetails extends Component {
  state = {
    item: null,
    isLoading: true,
    isError: false
  };

  swapiService = new SwapiService();

  updateItem() {
    const { selectedItem: itemId } = this.props;

    if(!itemId) {
      return;
    }

    this.setState({
      isLoading: true
    })

    this.swapiService
      .getPerson(itemId)
      .then(item => {
        this.setState({
          item,
          isLoading: false
        })
      })
      .catch((err) => {
        this.setState({
          isError: true,
          isLoading: false
        });
      });;
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState) {
    const {  selectedItem: prevId } = prevProps;
    const {  selectedItem: newId } = this.props;
    if( prevId !== newId)
    {
      this.updateItem();
    }
  }

  render() {

    const { item, isLoading, isError} = this.state;

    const spinner = isLoading ? <Spinner /> : null;
    const errorMessage = isError ? <ErrorIndicator /> : null;
    const content = (!(isLoading || isError) && item) ?
     <ItemView {...item} /> :
     null;

    return (
      <React.Fragment>
        { spinner }
        { errorMessage }
        { content }
      </React.Fragment>
    );
  }
}

const ItemView = ({id, name, gender, birthYear, eyeColor}) => {

  return (
    <div className="item-details card">
      <img className="item-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
      <div className="card-body">
        <h4>{ name }</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{ gender }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth year</span>
            <span>{ birthYear }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye color</span>
            <span>{ eyeColor }</span>
          </li>
        </ul>
      </div>
      <ErrorCreator />
    </div>
  );
}
