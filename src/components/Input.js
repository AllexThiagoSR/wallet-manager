import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { label, type, value, name, testid, id } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        {' '}
        <input
          type={ type }
          data-testid={ testid }
          value={ value }
          id={ id }
          name={ name }
        />
      </label>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string,
  id: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  testid: '',
};

export default Input;
