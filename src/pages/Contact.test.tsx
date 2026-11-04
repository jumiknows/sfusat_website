import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact';

jest.mock('../content/contact', () => ({
  CONTACT_EMAIL: 'team@example.com',
  CONTACT_FORM_ENDPOINT: 'https://relay.example.com/submit',
  CONTACT_FORM_ACCESS_KEY: 'test-key'
}));

const fillAndSubmit = () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('First Name (required)'), { target: { value: 'Ada' } });
  fireEvent.change(screen.getByLabelText('Email (required)'), { target: { value: 'ada@example.com' } });
  fireEvent.change(screen.getByLabelText('Subject (required)'), { target: { value: 'Hello' } });
  fireEvent.change(screen.getByLabelText('Message (required)'), { target: { value: 'A message' } });
  fireEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
};

const mockFetch = (implementation: () => Promise<unknown>) => {
  const fetchMock = jest.fn(implementation);
  global.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};

test('sends the message to the form relay and confirms delivery', async () => {
  const fetchMock = mockFetch(async () => ({ ok: true, json: async () => ({ success: true }) }));

  fillAndSubmit();

  expect(await screen.findByText(/Your message has been sent/)).toBeInTheDocument();
  expect(screen.getByLabelText('Message (required)')).toHaveValue('');

  const [url, options] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
  expect(url).toBe('https://relay.example.com/submit');
  expect(JSON.parse(options.body as string)).toMatchObject({
    access_key: 'test-key',
    email: 'ada@example.com',
    message: 'A message'
  });
});

test('keeps the message and offers email when the relay rejects it', async () => {
  mockFetch(async () => ({ ok: true, json: async () => ({ success: false }) }));

  fillAndSubmit();

  const link = await screen.findByRole('link', { name: 'send it from your email app' });
  expect(link.getAttribute('href')).toContain('mailto:team@example.com');
  expect(link.getAttribute('href')).toContain('A%20message');
  expect(screen.getByLabelText('Message (required)')).toHaveValue('A message');
  expect(screen.queryByText(/Your message has been sent/)).not.toBeInTheDocument();
});

test('shows an error when the relay cannot be reached', async () => {
  mockFetch(async () => {
    throw new Error('offline');
  });

  fillAndSubmit();

  await waitFor(() => {
    expect(screen.getByText(/could not be sent/)).toBeInTheDocument();
  });
  expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeEnabled();
});
