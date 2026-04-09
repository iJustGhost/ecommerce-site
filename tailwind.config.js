/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                goddess: {
                    50: '#fff0f5',  /* Lavender Blush */
                    100: '#ffdeeb', /* Very light pink */
                    200: '#ffc2d1', /* Light pink */
                    300: '#ff9eb5', /* Medium pink */
                    400: '#ff7597', /* Strong pink */
                    500: '#ff4d7a', /* Primary Pink */
                    600: '#e62e5d', /* Dark Pink */
                    700: '#c01644', /* Deep Pink */
                    800: '#9e123a', /* Accent Dark */
                    900: '#821133', /* Darkest */
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Lato', 'sans-serif'],
            }
        }
    },
    plugins: [],
};