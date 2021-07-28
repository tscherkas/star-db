import React from "react";
import ErrorCreator from "../error-creator";

import './item-list.css';

const ItemList = (props) => {
  const { data, onItemSelected, children: renderItem } = props;

  const elements = data.map((item) => {
    return (
      <li key={ item.id } className="list-group-item"
        onClick={ () => onItemSelected(item.id) }>
        { renderItem(item) }
      </li>
    );
  });

  return (
      <div className="item-list">
        <ul className="list-group">
          {
            elements
          }
        </ul>
        <ErrorCreator />
      </div>
    );
}


export default ItemList;
