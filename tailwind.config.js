/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vibe: {
          bg: '#090D16',
          surface: '#0F172A',
          card: '#151F36',
          cardHover: '#1C2947',
          border: '#24324F',
          muted: '#64748B',
          lightText: '#94A3B8',
          text: '#F1F5F9',
          accent: '#38BDF8',
          growth: '#10B981',
          experiment: '#F59E0B',
          graveyard: '#F43F5E',
          asset: '#8B5CF6',
          maintain: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
