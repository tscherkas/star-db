import React, {Component} from "react";

const withChildRenderFunction = (Wrapped, renderFunction) => {
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
