import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class TableRowFilled extends Component {
  deleteExpenseByID = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.props;
    const convertedValue = parseFloat(value) * parseFloat(exchangeRates[currency].ask);
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ parseFloat(value).toFixed(2) }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ convertedValue }</td>
        <td>BRL</td>
        <td>
          <button value={ id }>Editar</button>
          <button
            value={ id }
            data-testid="delete-btn"
            onClick={ () => this.deleteExpenseByID(id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

TableRowFilled.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(TableRowFilled);
