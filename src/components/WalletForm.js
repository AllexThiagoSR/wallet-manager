import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilledSelect from './FilledSelect';
import Input from './Input';
import { saveExpense } from '../redux/actions';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: methods[0],
    tag: tags[0],
  };

  componentDidUpdate(_prevProps, prevState) {
    const { edit, editor } = this.props;
    if (!this.checkObjectEquality(prevState, edit) && editor) {
      this.setState({
        ...edit,
      });
    }
  }

  checkObjectEquality = (obj1, obj2) => {
    const entries1 = Object.entries(obj1);

    return entries1.every((entrie) => entrie[1] === obj2[entrie[0]]);
  };

  handleChange = ({ target: { value, name } }) => this.setState({
    [name]: value,
  });

  reset = () => this.setState({
    value: '',
    description: '',
    currency: 'USD',
    method: methods[0],
    tag: tags[0],
  });

  handleSubmit = (e) => {
    e.preventDefault();
    const { expenses, dispatch } = this.props;

    dispatch(saveExpense({
      id: expenses.length,
      ...this.state,
    }));
    this.reset();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
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
          options={ methods }
          value={ method }
          name="method"
          id="method-input"
          onChange={ this.handleChange }
        />
        <FilledSelect
          label="Categoria:"
          testid="tag-input"
          options={ tags }
          value={ tag }
          name="tag"
          id="tag-input"
          onChange={ this.handleChange }
        />
        {
          !editor ? <button>Adicionar Despesa</button> : (
            <button
              type="button"
            >
              Editar despesa
            </button>
          )
        }
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, editor }, edit }) => ({
  currencies,
  expenses,
  editor,
  edit,
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
  editor: PropTypes.bool.isRequired,
  edit: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
