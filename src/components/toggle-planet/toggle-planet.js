import React, { Component } from "react";
import ErrorCreator from "../error-creator";

import "./toggle-planet.css";

export default class TogglePlanet extends Component {


  render() {
    const { onClick } = this.props;

    return (
      <div className="toggle-planet px-3">
        <button className="btn btn-info"
          onClick= { onClick } >Toggle planet</button>
        <ErrorCreator />
      </div>
    );
  }


}
