import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#E8F8F9',
          100: '#BFEDF0',
          200: '#90DFE6',
          300: '#5DD1DB',
          400: '#2FC5D1',
          500: '#11A5B0',
          600: '#0E8F99',
          700: '#0B7580',
          800: '#085C66',
          900: '#054149',
          950: '#022A30',
        },
        danger: '#D52832',
        success: '#119055',
        warning: '#F27E31',
        info: '#195DEF',
      },
      borderRadius: {
        md: '6px',
        lg: '8px',
        xl: '12px',
        '3xl': '20px',
        '4xl': '24px',
        card: '16px',
      },
    },
  },
  plugins: [],
}
export default config
