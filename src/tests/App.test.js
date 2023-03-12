import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mockFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(mockData),
});

const testEmail = 'teste@gmail.com';
const edit = {
  value: '10',
  description: 'dez dólares',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
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

describe('Testa o App', () => {
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

    const descInput = screen.getByLabelText(/Descrição:/);
    const valueInput = screen.getByLabelText(/Valor:/);
    const coinSelect = screen.getByLabelText(/Moeda:/);
    const methodSelect = screen.getByLabelText(/Método de pagamento:/);
    const tagSelect = screen.getByLabelText(/Categoria:/);
    const addExpenseButton = screen.getByRole('button', { name: /Adicionar Despesa/ });

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

  test('Teste: Se as informações do header são renderizadas de acordo com o state global', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState });
    const emailInput = screen.getByPlaceholderText('Email:');
    const passwordInput = screen.getByPlaceholderText('Password:');
    const sendButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '123456');
    userEvent.click(sendButton);

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText(testEmail)).toBeInTheDocument();
    expect(screen.getByText('66.31')).toBeInTheDocument();
    expect(screen.getAllByText('BRL')[0]).toBeInTheDocument();
  });

  test('Teste: Se é possível excluir e adicionar despesas', async () => {
    global.fetch = jest.fn(mockFetch);

    const { store } = renderWithRouterAndRedux(<App />, { initialState });
    const emailInput = screen.getByPlaceholderText('Email:');
    const passwordInput = screen.getByPlaceholderText('Password:');
    const sendButton = screen.getByRole('button', { name: 'Entrar' });
    const dataTestId = 'total-field';

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '123456');
    userEvent.click(sendButton);

    const descInput = screen.getByLabelText('Descrição:');
    const valueInput = screen.getByLabelText('Valor:');
    const coinSelect = screen.getByLabelText('Moeda:');
    const methodSelect = screen.getByLabelText('Método de pagamento:');
    const tagSelect = screen.getByLabelText('Categoria:');
    const addExpenseButton = screen.getByRole('button', { name: 'Adicionar Despesa' });

    const deleteButtons = screen.getAllByRole('button', { name: 'Excluir' });
    act(() => {
      userEvent.click(deleteButtons[1]);
    });

    expect(deleteButtons[1]).not.toBeInTheDocument();
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestId)).toHaveTextContent('47.53');
    expect(store.getState().wallet.expenses).toEqual([expenses[0]]);

    userEvent.type(descInput, expenses[1].description);
    userEvent.type(valueInput, expenses[1].value);
    userEvent.selectOptions(coinSelect, expenses[1].currency);
    userEvent.selectOptions(methodSelect, expenses[1].method);
    userEvent.selectOptions(tagSelect, expenses[1].tag);

    act(() => {
      userEvent.click(addExpenseButton);
    });

    await waitFor(() => {
      screen.getByText('5 dólares canadenses');
    });

    expect(store.getState().wallet.expenses).toEqual(expenses);
    expect(screen.getByTestId(dataTestId)).toHaveTextContent('66.31');
  });

  test('Teste: Se ao clicar em um dos botões de edição as informações correspondentes populam os inputs', () => {
    global.fetch = jest.fn(mockFetch);
    const { store } = renderWithRouterAndRedux(<App />, { initialState });
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

    const editButtons = screen.getAllByRole('button', { name: 'Editar' });

    act(() => {
      userEvent.click(editButtons[0]);
    });

    expect(store.getState().edit).toEqual(edit);
    expect(descInput).toHaveValue(edit.description);
    expect(valueInput).toHaveValue(Number(edit.value));
    expect(coinSelect).toHaveValue(edit.currency);
    expect(methodSelect).toHaveValue(edit.method);
    expect(tagSelect).toHaveValue(edit.tag);

    userEvent.clear(valueInput);
    userEvent.type(valueInput, '200');

    act(() => {
      userEvent.click(screen.getByRole('button', { name: /Editar Despesa/i }));
    });

    expect(screen.getByText('200.00')).toBeInTheDocument();
  });
});
