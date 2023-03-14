import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmailAction } from '../redux/actions';
import '../styles/Login.css';
import logo from '../imgs/logoTrybeWallet.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  emailIsValid = (email) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(email);
  };

  passwordIsValid = (password, minLength) => password.length >= minLength;

  handlerChange = ({ target: { value, name } }) => this.setState({
    [name]: value,
  });

  render() {
    const { email, password } = this.state;
    const minLength = 6;
    return (
      <div className="login-page">
        <main className="main-content">
          <img src={ logo } alt="TrybeWallet Logo" />
          <form
            className="login-form"
            onSubmit={ (e) => {
              e.preventDefault();
              const { history: { push }, dispatch } = this.props;
              dispatch(saveEmailAction(email));
              push('/carteira');
            } }
          >
            <input
              className="login-input"
              type="email"
              name="email"
              data-testid="email-input"
              id="-email-input"
              placeholder="Email:"
              value={ email }
              onChange={ this.handlerChange }
            />
            <input
              className="login-input"
              id="password-input"
              data-testid="password-input"
              name="password"
              value={ password }
              type="password"
              placeholder="Password:"
              onChange={ this.handlerChange }
            />
            <button
              className="login-button"
              disabled={
                !(this.emailIsValid(email) && this.passwordIsValid(password, minLength))
              }
            >
              Entrar
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
