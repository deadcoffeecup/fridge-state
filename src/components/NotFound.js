import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      Feeling lost? <Link to='/'>Click here</Link>
    </div>
  );
};
