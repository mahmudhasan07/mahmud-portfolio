import type { ISourceOptions } from "@tsparticles/engine";

export const nasaParticlesConfig: ISourceOptions = {
  autoPlay: true,
  background: {
    color: {
      value: "transparent",
    },
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "20%",
    opacity: 1,
  },
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  detectRetina: true,
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "bubble",
      },
      resize: {
        enable: true,
        delay: 0.5,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      speed: { min: 0.1, max: 1 },
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      value: 160,
    },
    opacity: {
      value: { min: 0.1, max: 1 },
      animation: {
        enable: true,
        speed: 1,
        startValue: "random",
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
};
