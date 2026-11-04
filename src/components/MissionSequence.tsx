import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './MissionSequence.css';

interface Chapter {
  start: number;
  end: number;
  readout: string;
}

// Scroll ranges (0 to 1) in which each chapter's text is on screen
const CHAPTERS: Chapter[] = [
  { start: -1, end: 0.14, readout: 'Earth' },
  { start: 0.24, end: 0.46, readout: '34 km' },
  { start: 0.56, end: 0.78, readout: 'Low Earth orbit' },
  { start: 0.88, end: 2, readout: 'Next: Polaris' }
];

const canUseWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch (error) {
    return false;
  }
};

const MissionSequence: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [isStatic] = useState(() => !canUseWebGL() || Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches));

  useEffect(() => {
    if (isStatic) {
      return;
    }

    let disposed = false;
    let scene: { setProgress: (p: number) => void; dispose: () => void } | null = null;
    let latest = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }
      const range = section.offsetHeight - window.innerHeight;
      latest = Math.min(Math.max(-section.getBoundingClientRect().top / Math.max(range, 1), 0), 1);
      scene?.setProgress(latest);

      CHAPTERS.forEach((chapter, index) => {
        const element = chapterRefs.current[index];
        if (!element) {
          return;
        }
        // The text follows the scroll position directly, in both directions
        const enter = Math.min((latest - chapter.start) / 0.05, 1);
        const leave = Math.min((chapter.end - latest) / 0.05, 1);
        const opacity = Math.max(Math.min(enter, leave), 0);
        element.style.opacity = String(opacity);
        element.style.transform = `translateY(${(1 - Math.min(enter, 1)) * 24 - (1 - Math.min(leave, 1)) * 24}px)`;
        element.style.visibility = opacity > 0 ? 'visible' : 'hidden';
      });

      if (readoutRef.current) {
        const climbing = latest > 0.12 && latest < 0.3;
        const active = CHAPTERS.reduce((found, chapter, index) => (latest >= chapter.start ? index : found), 0);
        readoutRef.current.textContent = climbing
          ? `${Math.round(((latest - 0.12) / 0.18) * 34)} km`
          : CHAPTERS[active].readout;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${latest})`;
      }
    };

    import('./missionScene').then(({ createMissionScene }) => {
      if (disposed || !canvasRef.current) {
        return;
      }
      scene = createMissionScene(canvasRef.current, true);
      scene.setProgress(latest);
      canvasRef.current.classList.add('ready');
    });

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      disposed = true;
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      scene?.dispose();
    };
  }, [isStatic]);

  const setChapter = (index: number) => (element: HTMLDivElement | null) => {
    chapterRefs.current[index] = element;
  };

  return (
    <section ref={sectionRef} className={`mission ${isStatic ? 'mission-static' : ''}`} aria-label="Our missions">
      <div className="mission-stage" style={{ backgroundImage: "url('/images/site/earth-horizon.jpg')" }}>
        {!isStatic && <canvas ref={canvasRef} className="mission-canvas" aria-hidden="true" />}

        <div ref={setChapter(0)} className="mission-chapter">
          <h1>Making Space Accessible</h1>
          <p>Satellites, rovers and high altitude systems, designed and built at Simon Fraser University.</p>
          <div className="mission-actions">
            <Link to="/rover/apply" className="btn btn-solid">Join the mission</Link>
            <Link to="/projects" className="btn btn-ghost">All projects</Link>
          </div>
        </div>

        <div ref={setChapter(1)} className="mission-chapter">
          <h2>34 km</h2>
          <p>Balloon 3 climbed to 34 km above Alberta, travelled 83.5 km and was recovered.</p>
          <div className="mission-actions">
            <Link to="/projects/balloon3" className="btn btn-ghost">Balloon 3</Link>
          </div>
        </div>

        <div ref={setChapter(2)} className="mission-chapter">
          <h2>ALEASAT</h2>
          <p>A 1U CubeSat built with UBC Orbit through ESA's Fly Your Satellite program, carrying an Earth imaging camera and a miniaturized human centrifuge.</p>
          <div className="mission-actions">
            <Link to="/projects/aleasat" className="btn btn-ghost">The mission</Link>
          </div>
        </div>

        <div ref={setChapter(3)} className="mission-chapter">
          <h2>Polaris</h2>
          <p>An autonomous rover built for rugged terrain and the Canadian International Rover Challenge in August 2027.</p>
          <div className="mission-actions">
            <Link to="/rover" className="btn btn-ghost">Meet Polaris</Link>
            <Link to="/rover/apply" className="btn btn-solid">Apply now</Link>
          </div>
        </div>

        {!isStatic && (
          <div className="mission-hud" aria-hidden="true">
            <span ref={readoutRef}>Earth</span>
            <span className="mission-track"><span ref={barRef} /></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default MissionSequence;
