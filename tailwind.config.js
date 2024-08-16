/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '375px',
      'md': '668px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      screens: {
        'ns': '500px'
      },
      backgroundImage: {
        'mobile-day': "url('./assets/mobile-daylight.png')",
        'mobile-night': "url('./assets/mobile-sm-bg.png')",
        'desktop-day': "url('./assets/morning.jpg')",
        'desktop-mid': "url('./assets/morning.jpg')",
        'desktop-night': "url('./assets/desktop-night.png')",
        'tab-day': "url('./assets/day_md-bg.png')",
        'tab-night': "url('./assets/night_md-bg.png')",
      },
      colors: {
        'mainColor': "#303030",
        'btnColor': "#707070",
        "tabColor": "#C7C9C8"
      },
      fontFamily: {
        'inter': ["Inter", "san-serif"]
      },
    
      gridTemplateColumns: {
        'quote': "min(80%, 500px) min(20%,50px)",
      }
    },
  },
  plugins: [],
}