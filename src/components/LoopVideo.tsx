import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

interface LoopVideoProps {
  name: string; // File name in public/videos, without the extension
  label: string;
}

// Silent looping clip. Downloads and plays only while on screen, and visitors can pause it.
const LoopVideo: React.FC<LoopVideoProps> = ({ name, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(() =>
    Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isPaused) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
    observer.observe(video);

    return () => observer.disconnect();
  }, [isPaused]);

  return (
    <div className="loop-video">
      <video
        ref={videoRef}
        src={`/videos/${name}.mp4`}
        poster={`/videos/${name}.jpg`}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
      />
      <button
        type="button"
        className="loop-video-toggle"
        aria-label={isPaused ? `Play video: ${label}` : `Pause video: ${label}`}
        onClick={() => setIsPaused(!isPaused)}
      >
        <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
      </button>
    </div>
  );
};

export default LoopVideo;
