import React, { Component } from 'react';
import Input from './Input';

class WalletForm extends Component {
  state = {
    value: '0',
    description: '',
  };

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <Input
          type="number"
          testid="value-input"
          value={ value }
          id="value-input"
          name="value"
          label="Valor:"
        />
        <Input
          label="Descrição:"
          type="text"
          testid="description-input"
          value={ description }
          id="description-input"
          name="description"
        />
      </form>
    );
  }
}

export default WalletForm;
