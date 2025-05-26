import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['src/**/*.{ts,tsx,html}', 'lib/components/ui/**/*.{ts,tsx,css}'],
  theme: {
    extend: {},
  },
  plugins: [],
  
}

export default config