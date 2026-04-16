import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        'surface-light': '#1a1a2e',
        'accent-blue': '#00d4ff',
        'accent-purple': '#7c3aed',
        'accent-pink': '#ec4899',
        'text-primary': '#f0f0f0',
        'text-secondary': '#a0a0b0',
        'text-muted': '#6b6b80',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-slow-reverse': 'spin 25s linear infinite reverse',
        'spin-slower': 'spin 40s linear infinite',
        'spin-slower-reverse': 'spin 35s linear infinite reverse',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 212, 255, 0.15)',
        'glow-md': '0 0 30px rgba(0, 212, 255, 0.2)',
        'glow-lg': '0 0 60px rgba(0, 212, 255, 0.25)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
