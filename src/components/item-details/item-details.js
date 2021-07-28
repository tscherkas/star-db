import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorCreator from "../error-creator";

import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
}

export default class ItemDetails extends Component {
  state = {
    item: null,
    isLoading: true,
    isError: false
  };


  updateItem() {
    const { selectedItem: itemId, getImageUrl } = this.props;

    if(!itemId) {
      return;
    }

    this.setState({
      isLoading: true
    })

    this.props
      .getData(itemId)
      .then(item => {
        this.setState({
          item,
          isLoading: false,
          image: getImageUrl(item)
        });
      })
      .catch((err) => {
        this.setState({
          isError: true,
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      selectedItem: prevId,
      getData: prevGetData,
      getImageUrl: prevGetImageUrl
    } = prevProps;
    const {
      selectedItem: newId,
      getData: newGetData,
      getImageUrl: newGetImageUrl
    } = this.props;
    if( prevId !== newId ||
        newGetData !== prevGetData ||
        newGetImageUrl !== prevGetImageUrl)
    {
      this.updateItem();
    }
  }

  render() {

    const { item, isLoading, isError, image} = this.state;

    if(!item){
      return <span>Please, select item.</span>
    }

    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {item});
    });

    const spinner = isLoading ? <Spinner /> : null;
    const errorMessage = isError ? <ErrorIndicator /> : null;
    const content = (!(isLoading || isError) && item) ?
     <ItemView {...item} image={image} children={children} /> :
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

const ItemView = ({id, name, gender, birthYear, eyeColor, image, children}) => {
  return (
    <div className="item-details card">
      <img className="item-image" alt={ name }
        src={image}/>
      <div className="card-body">
        <h4>{ name }</h4>
        <ul className="list-group">
          {children}
        </ul>
      </div>
      <ErrorCreator />
    </div>
  );
}

export {Record};
