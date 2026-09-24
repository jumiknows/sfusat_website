import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './components/Projects';

const renderNavbar = () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
};

test('renders the main navigation', () => {
  renderNavbar();

  expect(screen.getByRole('link', { name: 'SFU SAT Home' })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: 'Projects' })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: 'Sponsors' })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: 'Outreach' })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: 'About' })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: 'Contact Us' })).toBeInTheDocument();
});

test('opens and closes the navigation menu', () => {
  renderNavbar();

  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

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

test('renders the current project list', () => {
  render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Polaris' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'ALEASAT' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Balloon 1' })).toBeInTheDocument();
});
