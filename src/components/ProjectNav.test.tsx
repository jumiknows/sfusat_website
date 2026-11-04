import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectNav from './ProjectNav';
import { PROJECTS } from '../content/projects';

const renderAt = (path: string) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <ProjectNav />
    </MemoryRouter>
  );
};

test('links to the neighbouring projects, wrapping at the ends', () => {
  renderAt(PROJECTS[0].link as string);

  expect(screen.getByRole('link', { name: `Next ${PROJECTS[1].title}` })).toHaveAttribute('href', PROJECTS[1].link);
  const last = PROJECTS[PROJECTS.length - 1];
  expect(screen.getByRole('link', { name: `Previous ${last.title}` })).toHaveAttribute('href', last.link);
});

test('stays hidden away from project pages', () => {
  renderAt('/about');

  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});
