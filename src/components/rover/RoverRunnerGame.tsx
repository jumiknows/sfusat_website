import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Obstacle = {
  id: number;
  x: number;
  width: number;
  height: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

type GameSnapshot = {
  running: boolean;
  over: boolean;
  roverY: number;
  roverVelocity: number;
  distance: number;
  speed: number;
  obstacles: Obstacle[];
  particles: Particle[];
};

const WIDTH = 960;
const HEIGHT = 320;
const GROUND_Y = 268;
const GRAVITY = 1600;

const INITIAL: GameSnapshot = {
  running: false,
  over: false,
  roverY: 0,
  roverVelocity: 0,
  distance: 0,
  speed: 320,
  obstacles: [],
  particles: [],
};

const RoverRunnerGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const spawnRef = useRef(0);
  const obstacleIdRef = useRef(0);
  const gameRef = useRef<GameSnapshot>(INITIAL);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);

  const gradientCache = useMemo(() => {
    return {
      skyTop: '#24130d',
      skyBottom: '#7b371d',
      sun: '#ffbf87',
      duneA: '#9c562f',
      duneB: '#7f4326',
      duneC: '#5e311d',
      ground: '#6b3820',
    };
  }, []);

  const drawRover = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number) => {
    const bob = Math.sin(t * 7.5) * 1.8;
    const baseY = y + bob;

    ctx.save();
    ctx.translate(x, baseY);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;

    ctx.fillStyle = '#d7d2c8';
    ctx.strokeStyle = '#403930';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(-46, -34, 96, 34, 9);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(-18, -56, 56, 24, 7);
    ctx.fillStyle = '#c8beb0';
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#34404d';
    ctx.beginPath();
    ctx.roundRect(8, -52, 24, 16, 3);
    ctx.fill();

    ctx.fillStyle = '#8e9caf';
    ctx.fillRect(-24, -74, 5, 22);
    ctx.fillStyle = '#d5dde6';
    ctx.beginPath();
    ctx.roundRect(-35, -82, 28, 12, 4);
    ctx.fill();

    const wheelSpin = t * 12;
    const wheel = (wx: number) => {
      ctx.save();
      ctx.translate(wx, -2);
      ctx.fillStyle = '#1a1f26';
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#6f7f90';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(wheelSpin);
      ctx.strokeStyle = '#c9d6e6';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 7);
        ctx.stroke();
        ctx.rotate((Math.PI * 2) / 5);
      }
      ctx.restore();
    };

    wheel(-28);
    wheel(28);

    ctx.restore();
  };

  const emitDust = (state: GameSnapshot, x: number, y: number, count: number) => {
    for (let i = 0; i < count; i += 1) {
      state.particles.push({
        x,
        y,
        vx: -40 - Math.random() * 120,
        vy: -20 - Math.random() * 70,
        life: 0.45 + Math.random() * 0.35,
        size: 2 + Math.random() * 4,
      });
    }
  };

  const jump = useCallback(() => {
    const state = gameRef.current;
    if (!state.running || state.over) {
      return;
    }

    if (state.roverY === 0) {
      state.roverVelocity = 820;
      emitDust(state, 126, GROUND_Y - 2, 9);
    }
  }, []);

  const startGame = useCallback(() => {
    const fresh = {
      ...INITIAL,
      running: true,
      over: false,
    };
    gameRef.current = fresh;
    spawnRef.current = 0;
    obstacleIdRef.current = 0;
    setScore(0);
    setRunning(true);
    setOver(false);
    lastTimeRef.current = 0;
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
      }
      if (event.code === 'Enter' && !gameRef.current.running) {
        startGame();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [jump, startGame]);

  useEffect(() => {
    const draw = (ctx: CanvasRenderingContext2D, now: number) => {
      const state = gameRef.current;
      const t = now * 0.001;

      const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      sky.addColorStop(0, gradientCache.skyTop);
      sky.addColorStop(0.55, gradientCache.skyBottom);
      sky.addColorStop(1, '#4d2618');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = gradientCache.sun;
      ctx.globalAlpha = 0.38;
      ctx.beginPath();
      ctx.arc(760, 82, 52, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      const dune = (offset: number, amp: number, base: number, color: string) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, HEIGHT);
        for (let x = 0; x <= WIDTH; x += 14) {
          const y = base + Math.sin((x + offset) * 0.006) * amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(WIDTH, HEIGHT);
        ctx.closePath();
        ctx.fill();
      };

      dune(t * 50, 11, 188, gradientCache.duneA);
      dune(t * 32, 15, 212, gradientCache.duneB);
      dune(t * 24, 18, 236, gradientCache.duneC);

      const ground = ctx.createLinearGradient(0, GROUND_Y, 0, HEIGHT);
      ground.addColorStop(0, '#8a4d2b');
      ground.addColorStop(1, gradientCache.ground);
      ctx.fillStyle = ground;
      ctx.fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y);

      const trackShift = (state.distance * 10) % 60;
      ctx.strokeStyle = 'rgba(245, 203, 167, 0.24)';
      ctx.lineWidth = 2;
      for (let i = -1; i < 20; i += 1) {
        const x = i * 60 - trackShift;
        ctx.beginPath();
        ctx.moveTo(x, GROUND_Y + 3);
        ctx.lineTo(x + 32, HEIGHT);
        ctx.stroke();
      }

      state.particles.forEach((particle) => {
        ctx.globalAlpha = Math.max(0, particle.life * 1.5);
        ctx.fillStyle = '#ffd8b8';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      state.obstacles.forEach((obstacle) => {
        const x = obstacle.x;
        const y = GROUND_Y - obstacle.height;
        const fill = ctx.createLinearGradient(x, y, x, GROUND_Y);
        fill.addColorStop(0, '#f4be91');
        fill.addColorStop(0.3, '#b66f3b');
        fill.addColorStop(1, '#60341d');

        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.moveTo(x, GROUND_Y);
        ctx.lineTo(x + obstacle.width * 0.2, y + obstacle.height * 0.2);
        ctx.lineTo(x + obstacle.width * 0.62, y);
        ctx.lineTo(x + obstacle.width, y + obstacle.height * 0.18);
        ctx.lineTo(x + obstacle.width, GROUND_Y);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 239, 225, 0.25)';
        ctx.stroke();
      });

      drawRover(ctx, 116, GROUND_Y - state.roverY - 8, t);

      if (!state.running || state.over) {
        ctx.fillStyle = 'rgba(3, 8, 14, 0.5)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#e9f4ff';
        ctx.font = '700 34px Barlow, sans-serif';
        ctx.fillText(state.over ? 'Signal Lost' : 'Mission Warmup', WIDTH / 2, 122);
        ctx.font = '500 18px Barlow, sans-serif';
        ctx.fillStyle = '#c5dbf0';
        ctx.fillText(
          state.over ? 'Restart mission and clear the terrain.' : 'Press Enter or Start Mission.',
          WIDTH / 2,
          158
        );
      }
    };

    const step = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = timestamp;
      const state = gameRef.current;

      if (state.running && !state.over) {
        state.speed = Math.min(560, state.speed + dt * 7);
        state.distance += dt * 18;

        state.roverY += state.roverVelocity * dt;
        state.roverVelocity -= GRAVITY * dt;

        if (state.roverY <= 0) {
          if (state.roverY < 0) {
            emitDust(state, 116, GROUND_Y - 3, 4);
          }
          state.roverY = 0;
          state.roverVelocity = 0;
        }

        spawnRef.current += dt;
        if (spawnRef.current > Math.max(0.95, 1.6 - state.distance * 0.0045)) {
          const width = 24 + Math.random() * 24;
          const height = 24 + Math.random() * 34;
          state.obstacles.push({
            id: obstacleIdRef.current,
            x: WIDTH + 80,
            width,
            height,
          });
          obstacleIdRef.current += 1;
          spawnRef.current = 0;
        }

        state.obstacles = state.obstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - state.speed * dt }))
          .filter((obstacle) => obstacle.x + obstacle.width > -40);

        if (state.roverY === 0 && Math.random() > 0.6) {
          emitDust(state, 92, GROUND_Y - 6, 1);
        }

        state.particles = state.particles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * dt,
            y: particle.y + particle.vy * dt,
            vy: particle.vy + 350 * dt,
            life: particle.life - dt,
          }))
          .filter((particle) => particle.life > 0);

        const roverBounds = {
          left: 84,
          right: 146,
          top: GROUND_Y - state.roverY - 62,
          bottom: GROUND_Y - state.roverY - 12,
        };

        const hit = state.obstacles.some((obstacle) => {
          const left = obstacle.x;
          const right = obstacle.x + obstacle.width;
          const top = GROUND_Y - obstacle.height;
          const bottom = GROUND_Y;

          return (
            roverBounds.left < right &&
            roverBounds.right > left &&
            roverBounds.top < bottom &&
            roverBounds.bottom > top
          );
        });

        if (hit) {
          state.over = true;
          setOver(true);
          setRunning(false);
          setBestScore((previous) => Math.max(previous, Math.floor(state.distance)));
        }

        setScore(Math.floor(state.distance));
      }

      draw(context, timestamp);
      frameRef.current = requestAnimationFrame(step);
    };

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const ratio = window.devicePixelRatio || 1;
      canvas.width = WIDTH * ratio;
      canvas.height = HEIGHT * ratio;
      const context = canvas.getContext('2d');
      if (context) {
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    frameRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [gradientCache]);

  useEffect(() => {
    gameRef.current.running = running;
  }, [running]);

  return (
    <div className="ra-game-shell">
      <div className="ra-scoreboard">
        <span>Distance: {score} m</span>
        <span>Best: {bestScore} m</span>
      </div>

      <div className="ra-canvas-wrap" role="application" aria-label="Rover runner game">
        <canvas ref={canvasRef} className="ra-runner-canvas" />
      </div>

      <div className="ra-controls">
        <button type="button" className="ra-control-btn" onClick={startGame}>
          {running ? 'Restart Mission' : 'Start Mission'}
        </button>
        <button type="button" className="ra-control-btn ra-jump-btn" onClick={jump}>
          Jump
        </button>
      </div>

      {over && <p className="ra-hint">Tip: jump a touch earlier as speed rises during longer runs.</p>}
      {!running && !over && <p className="ra-hint">Press Enter to start, then Space or Arrow Up to jump.</p>}
    </div>
  );
};

export default RoverRunnerGame;
