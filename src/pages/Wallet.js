import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">
        <div className="upper-scope-container">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
