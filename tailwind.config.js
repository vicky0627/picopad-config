/** @type {import('tailwindcss').Config} */
const svgToDataUri = require('mini-svg-data-uri')
module.exports = {
  relative: true,
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0.5rem',
        md: '0.8rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      backgroundImage: (theme) => ({
        'multiselect-caret': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`
        )}")`,
        'multiselect-spinner': `url("${svgToDataUri(
          `<svg viewBox="0 0 512 512" fill="${theme(
            'colors.green.500'
          )}" xmlns="http://www.w3.org/2000/svg"><path d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"></path></svg>`
        )}")`,
        'multiselect-remove': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`
        )}")`
      })
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    // themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'picopad', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyU
    themes: [
      {
        picopad: {
          'color-scheme': 'dark',
          'primary': '#94b4c1',
          'primary-focus': '#7fa5b5',
          'primary-content': '#213448',
          
          'secondary': '#547792',
          'secondary-focus': '#456a85',
          'secondary-content': '#eae0cf',

          'accent': '#eae0cf',
          'accent-focus': '#dcd2bf',
          'accent-content': '#213448',

          'neutral': '#547792',
          'neutral-focus': '#456a85',
          'neutral-content': '#eae0cf',

          'base-100': '#213448',
          'base-200': '#2c4560', 
          'base-300': '#375678',
          'base-content': '#eae0cf',

          'info': '#38bdf8',
          'success': '#34d399',
          'warning': '#fbbf24',
          'error': '#f87171',

          '--rounded-box': '1.5rem', 
          '--rounded-btn': '0.8rem', 
          '--rounded-badge': '2rem',
          '--tab-radius': '0.8rem',
        },
        'picopad-light': {
          'color-scheme': 'light',
          'primary': '#547792', // Steel Blue
          'primary-focus': '#456a85',
          'primary-content': '#eae0cf',
          
          'secondary': '#94b4c1', // Light Blue
          'secondary-focus': '#82a5b5',
          'secondary-content': '#213448',

          'accent': '#213448', // Dark Blue
          'accent-focus': '#182635',
          'accent-content': '#eae0cf',

          'neutral': '#2c4560',
          'neutral-focus': '#1e334a',
          'neutral-content': '#eae0cf',

          'base-100': '#eae0cf', // Beige
          'base-200': '#dcd2bf', // Slightly darker beige
          'base-300': '#cfc4b0', // Darker still
          'base-content': '#213448',

          'info': '#0ea5e9',
          'success': '#10b981',
          'warning': '#f59e0b',
          'error': '#ef4444',

          '--rounded-box': '1.5rem', 
          '--rounded-btn': '0.8rem', 
          '--rounded-badge': '2rem',
          '--tab-radius': '0.8rem',
        }
      }
    ]
    // darkTheme: 'halloween',
    // themes:[
    //   {
    //     halloween:{
    //       ...require("daisyui/src/theming/themes")["[data-theme=halloween]"],
    //       primary: '#ef8f4c',
    //       'base-100': '#171717',
    //       'base-200': '#252525',
    //       'base-300': '#383838',
    //     }
    //   }
    // ]
  }
}
