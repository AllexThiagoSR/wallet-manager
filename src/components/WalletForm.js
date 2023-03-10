import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilledSelect from './FilledSelect';
import Input from './Input';

class WalletForm extends Component {
  state = {
    value: '0',
    description: '',
    currency: 'USD',
  };

  handleChange = ({ target: { value, name } }) => this.setState({
    [name]: value,
  });

  render() {
    const { value, description, currency } = this.state;
    const { currencies } = this.props;
    return (
      <form>
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
        <button>Adicionar Despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
