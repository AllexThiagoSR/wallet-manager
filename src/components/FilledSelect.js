import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilledSelect extends Component {
  render() {
    const { label, testid, options, value, name, id, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        {' '}
        <select
          id={ id }
          onChange={ onChange }
          value={ value }
          data-testid={ testid }
          name={ name }
        >
          {
            options.map((option) => (
              <option value={ option } key={ option + id }>{ option }</option>
            ))
          }
        </select>
      </label>
    );
  }
}

FilledSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FilledSelect.defaultProps = {
  id: '',
  testid: '',
};

export default FilledSelect;
