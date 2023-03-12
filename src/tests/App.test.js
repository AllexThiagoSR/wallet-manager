import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const testEmail = 'teste@gmail.com';
const expenses = [
  {
    id: 0,
    value: '10',
    description: 'dez dólares',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: mockData,
  },
  {
    id: 1,
    value: '5',
    description: '5 dólares canadenses',
    currency: 'CAD',
    method: 'Cartão de crédito',
    tag: 'Saúde',
    exchangeRates: mockData,
  },
];
const initialState = {
  user: {
    email: testEmail,
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses,
    editor: false,
    idToEdit: 0,
  },
  edit: {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  },
};

describe('Testa a página de Login', () => {
  test('Teste: Os elementos da página inicial estão na página', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText('Email:');
    const passwordInput = screen.getByPlaceholderText('Password:');
    const sendButton = screen.getByRole('button', { name: 'Entrar' });

    expect(emailInput).toBeVisible();
    expect(passwordInput).toBeVisible();
    expect(sendButton).toBeVisible();
    expect(sendButton).toBeDisabled();
  });

  test('Teste: Fazer login redireciona para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText('Email:');
    const passwordInput = screen.getByPlaceholderText('Password:');
    const sendButton = screen.getByRole('button', { name: 'Entrar' });

    expect(emailInput).toBeVisible();
    expect(passwordInput).toBeVisible();
    expect(sendButton).toBeVisible();
    expect(sendButton).toBeDisabled();

    userEvent.type(emailInput, 'teste@');
    userEvent.type(passwordInput, '123456');
    expect(sendButton).toBeDisabled();
    userEvent.type(emailInput, 'gmail.com');
    expect(sendButton).toBeEnabled();
    userEvent.click(sendButton);
    expect(history.location.pathname).toBe('/carteira');
  });

  test('Teste: Se os elementos da página de login estão na página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText('Email:');
    const passwordInput = screen.getByPlaceholderText('Password:');
    const sendButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '123456');
    userEvent.click(sendButton);

    const descInput = screen.getByLabelText('Descrição:');
    const valueInput = screen.getByLabelText('Valor:');
    const coinSelect = screen.getByLabelText('Moeda:');
    const methodSelect = screen.getByLabelText('Método de pagamento:');
    const tagSelect = screen.getByLabelText('Categoria:');
    const addExpenseButton = screen.getByRole('button', { name: 'Adicionar Despesa' });

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText(testEmail)).toBeInTheDocument();
    expect(screen.getByText('0.00')).toBeInTheDocument();
    expect(screen.getByText('BRL')).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(coinSelect).toBeInTheDocument();
    expect(methodSelect).toBeInTheDocument();
    expect(tagSelect).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();
  });

  test('Teste: Se os elementos da página de login estão na página', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState });
    const emailInput = screen.getByPlaceholderText('Email:');
    const passwordInput = screen.getByPlaceholderText('Password:');
    const sendButton = screen.getByRole('button', { name: 'Entrar' });

    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '123456');
    userEvent.click(sendButton);

    screen.logTestingPlaygroundURL();

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText(testEmail)).toBeInTheDocument();
    expect(screen.getByText('66.31')).toBeInTheDocument();
    expect(screen.getAllByText('BRL')[0]).toBeInTheDocument();
  });
});
