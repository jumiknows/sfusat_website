import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Join from './Join';
import { Program, recruitingSummary } from '../content/recruitment';

const role = { name: 'Software', description: 'Writes software', form: 'https://forms.example.com/a' };
const rover: Program = { id: 'rover', name: 'Rover', open: true, page: '/rover', roles: [role] };
const satellite: Program = { id: 'sat', name: 'Satellite', open: false, page: '/sat', roles: [] };

const renderJoin = (programs: Program[]) => {
  render(
    <MemoryRouter>
      <Join programs={programs} />
    </MemoryRouter>
  );
};

test('lists roles for open programs and links to their forms', () => {
  renderJoin([rover, satellite]);

  expect(screen.getByRole('heading', { name: 'Rover' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Apply for Software, Rover' })).toHaveAttribute('href', role.form);
  expect(screen.getByRole('link', { name: 'Satellite' })).toHaveAttribute('href', '/sat');
});

test('opening a second program needs only the data to change', () => {
  renderJoin([rover, { ...satellite, open: true, deadline: 'May 1', roles: [{ ...role, name: 'ADCS' }] }]);

  expect(screen.getByRole('link', { name: 'Apply for ADCS, Satellite' })).toBeInTheDocument();
  expect(screen.getByText('Apply by May 1')).toBeInTheDocument();
  expect(screen.getByText('We are recruiting for Rover and Satellite.')).toBeInTheDocument();
});

test('still makes sense when nothing is open', () => {
  renderJoin([{ ...rover, open: false }, satellite]);

  expect(screen.getByText('We are not recruiting right now.')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Apply for/ })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Get in touch' })).toBeInTheDocument();
});

test('summarizes three open programs', () => {
  expect(
    recruitingSummary([
      { ...rover, name: 'A' },
      { ...rover, name: 'B' },
      { ...rover, name: 'C' }
    ])
  ).toBe('We are recruiting for A, B and C.');
});
