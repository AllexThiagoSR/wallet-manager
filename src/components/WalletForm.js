import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilledSelect from './FilledSelect';
import Input from './Input';
import { saveExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '0',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target: { value, name } }) => this.setState({
    [name]: value,
  });

  handleSubmit = (e) => {
    e.preventDefault();
    const { expenses, dispatch } = this.props;
    dispatch(saveExpense({ id: expenses.length, ...this.state }));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form
        onSubmit={ this.handleSubmit }
      >
        <Input
          type="number"
          testid="value-input"
          value={ value }
          id="value-input"
          name="value"
          label="Valor:"
          onChange={ this.handleChange }
        />
        <Input
          label="Descrição:"
          type="text"
          testid="description-input"
          value={ description }
          id="description-input"
          name="description"
          onChange={ this.handleChange }
        />
        <FilledSelect
          label="Moeda:"
          testid="currency-input"
          options={ currencies }
          value={ currency }
          name="currency"
          id="currency-input"
          onChange={ this.handleChange }
        />
        <FilledSelect
          label="Método de pagamento:"
          testid="method-input"
          options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
          value={ method }
          name="paymentMethod"
          id="method-input"
          onChange={ this.handleChange }
        />
        <FilledSelect
          label="Categoria:"
          testid="tag-input"
          options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
          value={ tag }
          name="category"
          id="tag-input"
          onChange={ this.handleChange }
        />
        <button>Adicionar Despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
