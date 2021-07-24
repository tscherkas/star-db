import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorCreator from "../error-creator";

import './item-list.css';

export default class ItemList extends Component {


  state = {
    itemList: null,
    isLoading: true,
    isError: false
  };

  componentDidMount() {
    const { getData } = this.props;

    getData()
    .then((itemList) => {
        this.setState({
          itemList,
          isLoading: false
        });
      })
      .catch((err) => {
        this.setState({
          isError: true,
          isLoading: false
        });
      });
  }


  render() {
    const { itemList, isLoading, isError} = this.state;

    const spinner = isLoading ? <Spinner /> : null;
    const errorMessage = isError ? <ErrorIndicator /> : null;

    const itemsListViewProps = {
      spinner,
      errorMessage,
      items: itemList,
      onItemSelected: this.props.onItemSelected,
      renderItem: this.props.children }

    return (
      <div className="item-list">
        <ItemListView {...itemsListViewProps} />
      </div>
    );
  }
}

class ItemListView extends Component {

  renderItems(items, onItemSelected, renderItem) {
    console.log(renderItem);

    return items.map((item) => {
      const { id } = item;
      return (
        <li key={ id } className="list-group-item"
            onClick={ () => onItemSelected(id) }>
          { renderItem(item) }
        </li>
      );
    });
  }

  render() {
    const { spinner, errorMessage, items, onItemSelected,
            renderItem }  = this.props;
    const content = (spinner === null && errorMessage === null) ?
      (
        <div>
          <ul className="list-group">
            { this.renderItems(items, onItemSelected, renderItem) }
          </ul>
          <ErrorCreator />
        </div>
      ) :
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
