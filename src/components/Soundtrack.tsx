import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
  faMusic,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import './Soundtrack.css';

// Played through YouTube's own player, which handles licensing with the rights holders.
// These are official uploads that show a still of the album art rather than a music video.
// YouTube requires the player to stay visible and at least 200px in each direction, so closing the
// panel stops the music. Nothing loads from YouTube until a visitor opens the player.
export const TRACKS = [
  { id: '5PgdZDXg0z0', title: 'Space Oddity', artist: 'David Bowie' },
  { id: 'JuSsvM8B4Jc', title: 'Cornfield Chase', artist: 'Hans Zimmer' }
];

const PLAYING = 1;
const BUFFERING = 3;
const ENDED = 0;

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface YouTubeApi {
  Player: new (element: HTMLElement, options: object) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const loadYouTube = () =>
  new Promise<YouTubeApi>((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    window.onYouTubeIframeAPIReady = () => resolve(window.YT as YouTubeApi);
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => reject(new Error('YouTube could not be reached'));
    document.head.appendChild(script);
  });

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

const Soundtrack: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const startedRef = useRef(false);
  const track = TRACKS[trackIndex];

  const goToTrack = (step: number) => {
    setTrackIndex((current) => (current + step + TRACKS.length) % TRACKS.length);
  };

  useEffect(() => {
    document.body.classList.toggle('soundtrack-open', isOpen);
    return () => document.body.classList.remove('soundtrack-open');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;
    let player: YouTubePlayer | null = null;
    const mount = document.createElement('div');
    stageRef.current?.appendChild(mount);

    loadYouTube()
      .then((YT) => {
        if (cancelled) {
          return;
        }
        player = new YT.Player(mount, {
          width: '100%',
          height: '100%',
          host: 'https://www.youtube-nocookie.com',
          videoId: TRACKS[trackIndex].id,
          playerVars: { autoplay: 1, controls: 0, rel: 0, playsinline: 1, iv_load_policy: 3, fs: 0 },
          events: {
            onReady: () => {
              playerRef.current = player;
              player?.setVolume(volume);
              player?.playVideo();
            },
            onStateChange: ({ data }: { data: number }) => {
              setIsPlaying(data === PLAYING || data === BUFFERING);
              if (data === ENDED) {
                goToTrack(1);
              }
            },
            onError: () => setHasFailed(true)
          }
        });
      })
      .catch(() => setHasFailed(true));

    const clock = setInterval(() => {
      if (playerRef.current) {
        setTime(playerRef.current.getCurrentTime() || 0);
        setDuration(playerRef.current.getDuration() || 0);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearInterval(clock);
      player?.destroy();
      playerRef.current = null;
      startedRef.current = false;
      mount.remove();
      setIsPlaying(false);
      setHasFailed(false);
      setTime(0);
      setDuration(0);
    };
    // The player is created once per opening; track changes are handled below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = isOpen;
      return;
    }
    setHasFailed(false);
    setTime(0);
    playerRef.current?.loadVideoById(track.id);
  }, [track.id, isOpen]);

  const changeVolume = (next: number) => {
    setVolume(next);
    setIsMuted(next === 0);
    playerRef.current?.setVolume(next);
  };

  const toggleMute = () => {
    playerRef.current?.setVolume(isMuted ? volume || 70 : 0);
    setIsMuted(!isMuted);
  };

  return (
    <aside className="soundtrack" aria-label="Soundtrack">
      <button
        type="button"
        className={`soundtrack-toggle ${isOpen ? 'open' : ''}`}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Stop music and close player' : 'Open music player'}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isPlaying ? (
          <span className="soundtrack-bars" aria-hidden="true"><i /><i /><i /></span>
        ) : (
          <FontAwesomeIcon icon={faMusic} />
        )}
        <span className="soundtrack-toggle-label">Music</span>
      </button>

      {isOpen && (
        <div className="soundtrack-panel">
          <div ref={stageRef} className="soundtrack-stage" />

          <div className="soundtrack-controls">
            <div className="soundtrack-heading">
              <div>
                <strong>{track.title}</strong>
                <span>{track.artist}</span>
              </div>
              <button type="button" aria-label="Close player" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {hasFailed ? (
              <p className="soundtrack-error">
                This track will not play here.{' '}
                <a href={`https://www.youtube.com/watch?v=${track.id}`} target="_blank" rel="noopener noreferrer">
                  Listen on YouTube
                </a>
              </p>
            ) : (
              <div className="soundtrack-progress">
                <input
                  type="range"
                  aria-label="Position in track"
                  min={0}
                  max={duration || 1}
                  step={1}
                  value={time}
                  onChange={(e) => {
                    setTime(Number(e.target.value));
                    playerRef.current?.seekTo(Number(e.target.value), true);
                  }}
                />
                <span>{formatTime(time)} / {formatTime(duration)}</span>
              </div>
            )}

            <div className="soundtrack-buttons">
              <button type="button" aria-label="Previous track" onClick={() => goToTrack(-1)}>
                <FontAwesomeIcon icon={faBackwardStep} />
              </button>
              <button
                type="button"
                className="soundtrack-play"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                onClick={() => (isPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo())}
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              <button type="button" aria-label="Next track" onClick={() => goToTrack(1)}>
                <FontAwesomeIcon icon={faForwardStep} />
              </button>
            </div>

            <div className="soundtrack-volume">
              <button type="button" aria-label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
                <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
              </button>
              <input
                type="range"
                aria-label="Volume"
                min={0}
                max={100}
                value={isMuted ? 0 : volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Soundtrack;
