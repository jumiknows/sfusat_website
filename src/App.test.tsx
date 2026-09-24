import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

test('renders the main navigation', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: 'SFU SAT Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sponsors' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Outreach' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Contact Us' })).toBeInTheDocument();
});

test('opens and closes the navigation menu', () => {
  render(<App />);

  const openButton = screen.getByRole('button', { name: 'Open menu' });
  fireEvent.click(openButton);

  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true'
  );

  fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));

  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false'
  );
});

test('renders the projects route', () => {
  window.history.pushState({}, '', '/projects');

  render(<App />);

  expect(screen.getByRole('heading', { name: 'Polaris' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'ALEASAT' })).toBeInTheDocument();
});
