import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalValue = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      return acc + (parseFloat(value) * parseFloat(exchangeRates[currency].ask));
    }, 0);
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p>
          R$
          {' '}
          <span data-testid="total-field">{ totalValue.toFixed(2) }</span>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet: { expenses } }) => ({
  ...user,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
