import React, {Component} from "react";

const withChildRenderFunction = (renderFunction) => (Wrapped) => {
  return class extends Component {
    render() {
      return (
        <Wrapped {...this.props}>
          {renderFunction}
        </Wrapped>
      );
    }
  };
};

export default withChildRenderFunction;
