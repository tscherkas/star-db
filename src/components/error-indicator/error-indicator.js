import React from 'react';

import './error-indicator.css';
import icon from './death-star.png'

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img alt="Error" src={ icon } />
      <h3>Boom</h3>
      <span>Someting went completely wrong.</span>
      <span> {"But we've sent droits to fix the problem!"}</span>
    </div>
  );
}

export default ErrorIndicator;
