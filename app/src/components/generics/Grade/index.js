import React from 'react';
import PropTypes from 'prop-types';

import * as _style from './style';


const Grade = ({ className, value }) => {
  let grade;
  let degree;
  if (!value) {
    degree = 360;
    grade = '?';
  } else {
    degree = parseInt(value * 36, 10);
    grade = String(value);
    if (Math.abs(value % 1) < 0.05) {
      grade += '.0';
    }
  }

  return (
    <div style={_style.circle} className={className} >
      <div style={_style.externalCircle} />
      <div style={_style.innerCircle} >
        {grade}
      </div>
      <Arc quarter={1} degree={degree} value={value} />
      <Arc quarter={2} degree={degree} value={value} />
      <Arc quarter={3} degree={degree} value={value} />
      <Arc quarter={4} degree={degree} value={value} />
      <div style={_style.cover(degree)} />
    </div>
  );
};

Grade.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
};

const Arc = props => <div style={_style.arc(props)} />;

export default Grade;