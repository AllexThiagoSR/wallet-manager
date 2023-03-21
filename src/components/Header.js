import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../imgs/logoTrybeWallet.png';
import coins from '../imgs/coinsImage.png';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalValue = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      return acc + (parseFloat(value) * parseFloat(exchangeRates[currency].ask));
    }, 0);
    return (
      <header className="header">
        <img src={ logo } alt="TrybeWallet Logo" className="header-logo" />
        <div className="total-expenses">
          <img src={ coins } alt="Coins" />
          <span data-testid="total-field">
            { `Total de despesas: ${totalValue.toFixed(2)}` }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <p data-testid="email-field" className="email">{ email }</p>
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
