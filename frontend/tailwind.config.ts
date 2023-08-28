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
        'light-secondary': '#212121',
        'primary': '#FF9B05',
        'light-gray': "F5F5F5"
      },
      fontFamily: {
        'primary': ['Poppins']
      }
    },
  },
  plugins: [],
}
export default config
