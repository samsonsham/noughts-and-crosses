import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders Noughts & Crosses', () => {
  render(<App />);
  const turn = screen.getByText(/Turn:/i);
  const title = screen.getByText(/Noughts & Crosses/i);
  expect(turn).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});

test('display Turn:', () => {
  render(<App />);
  const turn = screen.getByText(/Turn:/i);
  expect(turn).toBeInTheDocument();
});

test('steps to Crosses win', () => {
  render(<App />);
  const steps = [5, 1, 7, 2, 3];
  steps.forEach((step) => {
    fireEvent.click(screen.getByTestId(step));
  });
  const winner = screen.queryByText(/Winner is Crosses/i);
  expect(winner).toBeInTheDocument();
});

test('steps to Noughts win', () => {
  render(<App />);
  const steps = [5, 1, 7, 3, 8, 2];
  steps.forEach((step) => {
    fireEvent.click(screen.getByTestId(step));
  });
  const winner = screen.queryByText(/Winner is Noughts/i);
  expect(winner).toBeInTheDocument();
});

test('steps to draw game', () => {
  render(<App />);
  const steps = [5, 1, 7, 3, 2, 8, 6, 4, 9];
  steps.forEach((step) => {
    fireEvent.click(screen.getByTestId(step));
  });
  const winner = screen.queryByText(/Draw Game/i);
  expect(winner).toBeInTheDocument();
});

test('steps to Crosses win at last', () => {
  render(<App />);
  const steps = [5, 1, 7, 3, 2, 8, 6, 9, 4];
  steps.forEach((step) => {
    fireEvent.click(screen.getByTestId(step));
  });
  const winner = screen.queryByText(/Winner is Cross/i);
  expect(winner).toBeInTheDocument();
});
