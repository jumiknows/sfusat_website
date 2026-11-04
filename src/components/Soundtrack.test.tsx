import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Soundtrack, { TRACKS } from './Soundtrack';

const player = {
  playVideo: jest.fn(),
  pauseVideo: jest.fn(),
  loadVideoById: jest.fn(),
  seekTo: jest.fn(),
  setVolume: jest.fn(),
  getCurrentTime: () => 0,
  getDuration: () => 100,
  destroy: jest.fn()
};
let options: any;
const Player = jest.fn();

beforeEach(() => {
  Player.mockImplementation((_element: HTMLElement, playerOptions: object) => {
    options = playerOptions;
    return player;
  });
  window.YT = { Player: Player as any };
});

const openPlayer = async () => {
  fireEvent.click(screen.getByRole('button', { name: 'Open music player' }));
  await waitFor(() => expect(Player).toHaveBeenCalled());
  act(() => options.events.onReady());
};

test('loads nothing from YouTube until the visitor asks', () => {
  render(<Soundtrack />);

  expect(Player).not.toHaveBeenCalled();
});

test('uses our own controls on a visible privacy-enhanced player', async () => {
  render(<Soundtrack />);
  await openPlayer();

  expect(options.videoId).toBe(TRACKS[0].id);
  expect(options.host).toBe('https://www.youtube-nocookie.com');
  expect(options.playerVars.controls).toBe(0);

  act(() => options.events.onStateChange({ data: 1 }));
  fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
  expect(player.pauseVideo).toHaveBeenCalled();
});

test('moves between tracks and stops when closed', async () => {
  render(<Soundtrack />);
  await openPlayer();

  fireEvent.click(screen.getByRole('button', { name: 'Next track' }));
  expect(player.loadVideoById).toHaveBeenCalledWith(TRACKS[1].id);
  expect(screen.getByText(TRACKS[1].title)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Close player' }));
  expect(player.destroy).toHaveBeenCalled();
});

test('offers YouTube when a track will not play', async () => {
  render(<Soundtrack />);
  await openPlayer();

  act(() => options.events.onError());
  expect(screen.getByRole('link', { name: 'Listen on YouTube' })).toHaveAttribute(
    'href',
    `https://www.youtube.com/watch?v=${TRACKS[0].id}`
  );
});
