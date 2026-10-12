/**
 * Web Audio Ambient Synthesizer matching raksmey-pheakdey.vercel.app
 * Provides an organic, serene drone chord + randomized celesta/harp chime notes.
 * 100% reliable inside Telegram and Messenger webviews without network audio drops.
 */

class WeddingSoundtrack {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private chimeTimer: number | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  // Musical notes in sacred pentatonic/diatonic harmony
  private readonly chimeNotes = [
    261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25,
  ];

  public init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public async play(): Promise<boolean> {
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    if (this.isPlaying) return true;
    this.isPlaying = true;
    this.notify();

    // Start warm ambient drone chord
    this.startDrone();

    // Start delicate randomized celesta/harp bell schedule
    this.scheduleChime();

    return true;
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.notify();

    if (this.chimeTimer) {
      window.clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }

    if (this.droneGain && this.ctx) {
      this.droneGain.gain.linearRampToValueAtTime(
        0,
        this.ctx.currentTime + 1.2,
      );
      setTimeout(() => {
        this.droneOscs.forEach((o) => {
          try {
            o.stop();
          } catch {}
        });
        this.droneOscs = [];
      }, 1400);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.connect(this.droneGain);

    // Warm chord: D3, A3, D4
    const freqs = [130.81, 196.0, 131.2];
    this.droneOscs = freqs.map((f) => {
      const osc = this.ctx!.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, this.ctx!.currentTime);
      osc.connect(filter);
      osc.start();
      return osc;
    });

    this.droneGain.gain.linearRampToValueAtTime(
      0.065,
      this.ctx.currentTime + 3,
    );
  }

  private scheduleChime() {
    if (!this.isPlaying || !this.ctx) return;

    const t = this.ctx.currentTime + 0.05;
    const note =
      this.chimeNotes[Math.floor(Math.random() * this.chimeNotes.length)];
    this.playChime(note, t);

    // Occasional paired gentle harmony
    if (Math.random() < 0.35) {
      const harm =
        this.chimeNotes[Math.floor(Math.random() * this.chimeNotes.length)];
      this.playChime(harm, t + 0.32, 0.05);
    }

    const nextDelay = 1400 + Math.random() * 2600;
    this.chimeTimer = window.setTimeout(() => this.scheduleChime(), nextDelay);
  }

  private playChime(freq: number, startTime: number, volume = 0.08) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const subGain = this.ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2.01, startTime);

    subGain.gain.setValueAtTime(0.18, startTime);
    osc1.connect(noteGain);
    osc2.connect(subGain).connect(noteGain);
    noteGain.connect(this.masterGain);

    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(volume, startTime + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.6);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + 2.7);
    osc2.stop(startTime + 2.7);
  }
}

export const soundtrack = new WeddingSoundtrack();
