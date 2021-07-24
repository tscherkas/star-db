import React from 'react';

import './row.css'

const Row = (props) => {

  const { left, right } = props;

  return (
    <div className="row mb2">
      <div className="col-lg-4">
        { left }
      </div>
      <div className="col-lg-8 d-flex justify-content-center align-items-center">
        { right }
      </div>
    </div>
  );
}

export default Row;
