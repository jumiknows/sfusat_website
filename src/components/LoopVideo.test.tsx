import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LoopVideo from './LoopVideo';

test('shows a silent clip that visitors can pause and resume', () => {
  render(<LoopVideo name="clip" label="A clip" />);

  const video = screen.getByLabelText('A clip') as HTMLVideoElement;
  expect(video).toHaveAttribute('src', '/videos/clip.mp4');
  expect(video.muted).toBe(true);

  fireEvent.click(screen.getByRole('button', { name: 'Pause video: A clip' }));
  fireEvent.click(screen.getByRole('button', { name: 'Play video: A clip' }));
  expect(screen.getByRole('button', { name: 'Pause video: A clip' })).toBeInTheDocument();
});
