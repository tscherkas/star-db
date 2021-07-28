import React, { Component } from 'react';

import './error-creator.css';

export default class ErrorCreator extends Component {
  state = {
    renderError: false
  }

  render() {

    if(this.state.renderError){
      this.t.y = 0;
    }

    return (
        <button className="btn btn-danger"
          onClick= { this.onErrorClick  } >Error</button>
    );
  }

  onErrorClick = (e) => {
    this.setState({
      renderError: true
    });
  }


}
