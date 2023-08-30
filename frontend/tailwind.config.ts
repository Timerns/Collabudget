import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'secondary': '#212121',
        'light-secondary': '#4A4A4A',
        'primary': '#FF9B05',
        'dark-primary': '#D18006',
        'light-gray': "#F5F5F5",
        'red': "#F14668",
        'green': "#46D2A0",
        'white': "#F5F5F5"
      },
      fontFamily: {
        'primary': ['Poppins']
      }
    },
  },
  plugins: [],
}
export default config
