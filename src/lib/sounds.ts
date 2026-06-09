// Web Audio API synthesizer for elegant interactive UI sound effects
// Extremely lightweight, zero dependencies, memory-safe, and responsive.
// Reuses a single lazy-loaded AudioContext to comply with browser limits.

let sharedAudioCtx: AudioContext | null = null;

const getSharedAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
};

/**
 * Play a light, highly responsive, crisp tactile touch/click sound (for menu tabs & nav links)
 */
export const playNavClickSound = () => {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Fast frequency sweep down from high to mid-low
    osc.frequency.setValueAtTime(380, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

    // Keep it extremely quiet/subtle to feel like an element click
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (error) {
    // Fail silently - browser autoplay protections or locked tabs
  }
};

/**
 * Play an elegant rising chime (perfect for actions like download resume or CTA clicks)
 */
export const playResumeChime = () => {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const playNote = (freq: number, startOffset: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + startOffset);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + startOffset + duration);

      gain.gain.setValueAtTime(0.02, now + startOffset);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + startOffset + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration);
    };

    // Staggered minor/major arpeggio sweep
    playNote(261.63, 0, 0.15);     // C4
    playNote(329.63, 0.04, 0.18);  // E4
    playNote(392.00, 0.08, 0.22);  // G4
    playNote(523.25, 0.12, 0.28);  // C5
  } catch (error) {
    // Fail silently
  }
};

/**
 * Play a high-quality gentle marimba pluck sound (custom configured for project card hover states)
 */
export const playHoverSound = () => {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    // Organic sound spectrum that slides up gracefully
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    // Dynamic clean envelope to keep it soft, pleasant, and premium
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.012, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (error) {
    // Fail silently
  }
};
