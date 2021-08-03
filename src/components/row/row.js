import React from 'react';
import PropTypes from "prop-types";
import ErrorBoundry from "../error-boundry";
import './row.css'

const Row = (props) => {

  const { left, right } = props;

  return (
    <div className="row mb2">
      <div className="col-lg-4">
        <ErrorBoundry>{ left }</ErrorBoundry>
      </div>
      <div className="col-lg-8 d-flex justify-content-center align-items-center">
        <ErrorBoundry>{ right }</ErrorBoundry>
      </div>
    </div>
  );
}

Row.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node
}

export default Row;
