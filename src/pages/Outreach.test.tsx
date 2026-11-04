import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Outreach from './Outreach';

const renderOutreach = () => {
  render(
    <MemoryRouter>
      <Outreach />
    </MemoryRouter>
  );

  const slideshow = screen.getByRole('region', { name: 'Photos from outreach events' });
  const total = (slideshow.textContent ?? '').match(/\/ (\d+)/)?.[1];

  return { slideshow, total };
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('arrows move between photos and wrap around', () => {
  const { slideshow, total } = renderOutreach();

  fireEvent.click(screen.getByRole('button', { name: 'Previous image' }));
  expect(slideshow).toHaveTextContent(`${total} / ${total}`);

  fireEvent.click(screen.getByRole('button', { name: 'Next image' }));
  expect(slideshow).toHaveTextContent(`1 / ${total}`);
});

test('swiping changes the photo', () => {
  const { slideshow, total } = renderOutreach();

  fireEvent.touchStart(slideshow, { touches: [{ clientX: 300 }] });
  fireEvent.touchEnd(slideshow, { changedTouches: [{ clientX: 100 }] });
  expect(slideshow).toHaveTextContent(`2 / ${total}`);

  fireEvent.touchStart(slideshow, { touches: [{ clientX: 100 }] });
  fireEvent.touchEnd(slideshow, { changedTouches: [{ clientX: 120 }] });
  expect(slideshow).toHaveTextContent(`2 / ${total}`);
});

test('advances automatically until paused', () => {
  const { slideshow, total } = renderOutreach();

  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(slideshow).toHaveTextContent(`2 / ${total}`);

  fireEvent.click(screen.getByRole('button', { name: 'Pause slideshow' }));
  act(() => {
    jest.advanceTimersByTime(20000);
  });
  expect(slideshow).toHaveTextContent(`2 / ${total}`);

  fireEvent.click(screen.getByRole('button', { name: 'Play slideshow' }));
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(slideshow).toHaveTextContent(`3 / ${total}`);
});
