/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card-bg))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ink: 'var(--ink)',
        teal: 'var(--teal)',
        mint: 'var(--mint)',
        surface: 'var(--surface)',
        'surface-solid': 'var(--surface-solid)',
        accent: 'var(--accent)',
        peach: 'var(--peach)',
        rose: 'var(--rose)',
        mintp: 'var(--mintp)',
        butter: 'var(--butter)',
        sky: 'var(--sky)',
        lav: 'var(--lav)',
        warn: 'var(--warn)',
        warnbg: 'var(--warnbg)',
        success: 'var(--success)',
        line: 'var(--line)',
        'text-custom': 'var(--text)',
        'muted-custom': 'var(--muted)',
        'on-ink': 'var(--onink)',
        cardbg: 'var(--card)',
        'card-solid': 'var(--card-solid)',
        bg: 'var(--bg)',
        'vs-dark': 'var(--vs-dark)',
        'vs-teal': 'var(--vs-teal)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
