/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Base dark colors
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a24',
          600: '#22222e',
        },
        // Accent colors
        accent: {
          cyan: '#00d4ff',
          teal: '#00b894',
          rose: '#ff6b9d',
          coral: '#ff7675',
          violet: '#a855f7',
          emerald: '#10b981',
        },
        // Glass colors
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.15)',
        },
      },
      backgroundImage: {
        'gradient-mesh':
          'radial-gradient(at 40% 20%, hsla(269, 97%, 35%, 0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 40%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(339, 100%, 55%, 0.2) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(160, 100%, 40%, 0.2) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(269, 100%, 50%, 0.3) 0px, transparent 50%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-rose': '0 0 20px rgba(255, 107, 157, 0.3)',
        'glow-violet': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
