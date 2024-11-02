/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                'dark-blue': '#133477',
                'mid-blue': '#1B3C80',
                'light-blue': '#3E5B95'
            }
        }
    },
    plugins: []
};
