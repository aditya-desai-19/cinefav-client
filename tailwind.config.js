/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
        'btn-height': '35px',
        'modal-height': '500px',
      },
      width: {
        '10p': '10%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%'
      },
      colors: {
        'navbg': 'rgba(0, 0, 0, 0.95)',
        'blackbg': 'rgba(0, 0, 0, 0.85)',
        'formbg': 'rgba(0, 0, 0, 0.1)',
      },
      screens: {
        'xsm': '420px', //small mobiles
        'sm': '431px', //mobile
        'md': '1025px', //tablet
      }  
    },
  },
  plugins: [],
}

