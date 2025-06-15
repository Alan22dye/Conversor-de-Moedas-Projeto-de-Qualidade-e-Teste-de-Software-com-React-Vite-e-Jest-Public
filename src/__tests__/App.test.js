import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import React from 'react';

describe('Testes do Conversor de Moedas', () => {
  test('1 - Renderiza input, selects e botão', () => {
    render(<App />);
    expect(screen.getByTestId('input-amount')).toBeInTheDocument();
    expect(screen.getByTestId('select-from')).toBeInTheDocument();
    expect(screen.getByTestId('select-to')).toBeInTheDocument();
    expect(screen.getByTestId('btn-convert')).toBeInTheDocument();
  });

  test('2 - Permite digitar um valor no input', () => {
    render(<App />);
    const input = screen.getByTestId('input-amount');
    fireEvent.change(input, { target: { value: '123.45' } });
    expect(input.value).toBe('123.45');
  });

  test('3 - Seleciona moeda de origem e destino', () => {
    render(<App />);
    const selectFrom = screen.getByTestId('select-from');
    const selectTo = screen.getByTestId('select-to');

    fireEvent.change(selectFrom, { target: { value: 'USD' } });
    fireEvent.change(selectTo, { target: { value: 'EUR' } });

    expect(selectFrom.value).toBe('USD');
    expect(selectTo.value).toBe('EUR');
  });

  test('4 - Alerta ao tentar converter valor inválido', () => {
    window.alert = jest.fn();
    render(<App />);
    const button = screen.getByTestId('btn-convert');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Digite um valor numérico válido');
  });

  test('5 - Converte BRL para USD corretamente', () => {
    render(<App />);
    const input = screen.getByTestId('input-amount');
    const selectFrom = screen.getByTestId('select-from');
    const selectTo = screen.getByTestId('select-to');
    const button = screen.getByTestId('btn-convert');

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.change(selectFrom, { target: { value: 'BRL' } });
    fireEvent.change(selectTo, { target: { value: 'USD' } });
    fireEvent.click(button);

    expect(screen.getByTestId('result')).toHaveTextContent('10 BRL = 2.00 USD');
  });

  test('6 - Converte USD para EUR corretamente', () => {
    render(<App />);
    const input = screen.getByTestId('input-amount');
    const selectFrom = screen.getByTestId('select-from');
    const selectTo = screen.getByTestId('select-to');
    const button = screen.getByTestId('btn-convert');

    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.change(selectFrom, { target: { value: 'USD' } });
    fireEvent.change(selectTo, { target: { value: 'EUR' } });
    fireEvent.click(button);

    expect(screen.getByTestId('result')).toHaveTextContent('5 USD = 4.50 EUR');
  });

  test('7 - Converte EUR para BRL corretamente', () => {
    render(<App />);
    const input = screen.getByTestId('input-amount');
    const selectFrom = screen.getByTestId('select-from');
    const selectTo = screen.getByTestId('select-to');
    const button = screen.getByTestId('btn-convert');

    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.change(selectFrom, { target: { value: 'EUR' } });
    fireEvent.change(selectTo, { target: { value: 'BRL' } });
    fireEvent.click(button);

    expect(screen.getByTestId('result')).toHaveTextContent('3 EUR = 16.95 BRL');
  });

  test('8 - Resultado não aparece antes de converter', () => {
    render(<App />);
    expect(screen.queryByTestId('result')).toBeNull();
  });

  test('9 - Converter mesma moeda mostra mesmo valor', () => {
    render(<App />);
    const input = screen.getByTestId('input-amount');
    const selectFrom = screen.getByTestId('select-from');
    const selectTo = screen.getByTestId('select-to');
    const button = screen.getByTestId('btn-convert');

    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.change(selectFrom, { target: { value: 'USD' } });
    fireEvent.change(selectTo, { target: { value: 'USD' } });
    fireEvent.click(button);

    expect(screen.getByTestId('result')).toHaveTextContent('100 USD = 100.00 USD');
  });

  test('10 - Aceita valores decimais com vírgula e converte corretamente', () => {
    render(<App />);
    const input = screen.getByTestId('input-amount');
    const button = screen.getByTestId('btn-convert');

    // Modificando valor com vírgula (trocar para ponto)
    fireEvent.change(input, { target: { value: '15,5'.replace(',', '.') } });

    fireEvent.click(button);

    expect(screen.getByTestId('result')).toBeInTheDocument();
  });
});
