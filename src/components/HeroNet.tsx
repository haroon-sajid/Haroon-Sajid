import React, { useEffect, useRef } from "react";

/* Particle-network backdrop for the mobile hero.

   Three things keep it from being a battery tax: it never starts above 768px
   (the desktop hero keeps its wave artwork), it stops while the tab is hidden,
   and it draws a single static frame instead of animating when the visitor has
   asked for reduced motion. Node and link colour are read from the palette
   variables rather than hardcoded, so it follows the light/dark toggle. */

const MOBILE = '(max-width: 768px)';
const LINK_DISTANCE = 100;
const MAX_PARTICLES = 38;

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

function HeroNet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = window.matchMedia(MOBILE);
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rgb = '156, 163, 175';
    const pointer: { x: number | null; y: number | null } = { x: null, y: null };

    /* The palette lives in CSS. Reading the resolved colour off the canvas
       keeps one source of truth and survives a theme toggle. */
    const readColour = () => {
      const parsed = getComputedStyle(canvas).color.match(/\d+/g);
      if (parsed && parsed.length >= 3) rgb = parsed.slice(0, 3).join(', ');
    };

    const seed = () => {
      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.1 + Math.random() * 1.4
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColour();
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (pointer.x !== null && pointer.y !== null) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 130 && d > 0.001) {
            p.vx += (dx / d) * 0.02;
            p.vy += (dy / d) * 0.02;
          }
        }

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 0.6) {
          p.vx = (p.vx / speed) * 0.6;
          p.vy = (p.vy / speed) * 0.6;
        }

        p.x += p.vx;
        p.y += p.vy;

        /* Wrap rather than bounce — bouncing makes the edges legible */
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK_DISTANCE) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${rgb}, 0.55)`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      draw();
      /* A theme toggle changes the variable, not the DOM this component owns,
         so the colour is re-read on a slow cadence instead of every frame. */
      if (++frame % 60 === 0) readColour();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const start = () => {
      if (running || !mobile.matches || document.hidden) return;
      running = true;
      resize();
      if (calm.matches) {
        draw();
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      if (!running) return;
      resize();
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onBreakpoint = () => (mobile.matches ? start() : stop());

    const trackPointer = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = x - rect.left;
      pointer.y = y - rect.top;
    };

    const onPointerMove = (e: PointerEvent) => trackPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) trackPointer(touch.clientX, touch.clientY);
    };
    const clearPointer = () => {
      pointer.x = null;
      pointer.y = null;
    };

    start();

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', clearPointer);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', clearPointer);
    document.addEventListener('visibilitychange', onVisibility);
    mobile.addEventListener('change', onBreakpoint);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', clearPointer);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', clearPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      mobile.removeEventListener('change', onBreakpoint);
    };
  }, []);

  return <canvas className="hero-net" ref={canvasRef} aria-hidden="true" />;
}

export default HeroNet;
