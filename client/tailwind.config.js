/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
		},
		extend: {
			fontFamily: {
				shantell: "'Shantell Sans', cursive",
			},
			colors: {
				primary: '#76C601',
				secondary: '#2D6200',
			},
		},
	},
	plugins: [],
};
