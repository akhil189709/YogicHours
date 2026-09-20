/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Brand system — "divine" premium theme used across Hero/Header/Footer/Home sections.
                forest: {
                    DEFAULT: '#143024',
                    50: '#eef5f1',
                    100: '#d6e6dc',
                    200: '#adccb9',
                    300: '#7fae92',
                    400: '#4f8a6c',
                    500: '#2f6b4d',
                    600: '#1e4f38',
                    700: '#143024',
                    800: '#0f251c',
                    900: '#081b11',
                    950: '#040806',
                },
                gold: {
                    DEFAULT: '#be9227',
                    50: '#fdf8ec',
                    100: '#faedc7',
                    200: '#f4d98a',
                    300: '#eec24d',
                    400: '#d4af37',
                    500: '#be9227',
                    600: '#a67e1f',
                    700: '#8a6a1c',
                    800: '#6f541c',
                    900: '#5c451c',
                },
                // Legacy tokens kept for any existing usages during the rebrand pass.
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c3d66',
                },
                accent: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f8b4e6',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', "'Outfit'", 'system-ui', 'sans-serif'],
                serif: ['var(--font-serif)', "'Cormorant Garamond'", 'serif'],
                display: ["'Cormorant Garamond'", 'serif'],
                outfit: ["'Outfit'", 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
