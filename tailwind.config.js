/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./resources/js/blocks/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#23366A",
                "primary-light": "#4a7bc8",
                "primary-dark": "#0f2d54",
                secondary: "#333333",
                accent: "#4a7bc8",
            },
            borderRadius: {
                none: "0",
            },
            backgroundColor: {
                "primary/10": "rgba(18, 60, 105, 0.1)",
                "primary/90": "rgba(18, 60, 105, 0.9)",
            },
        },
    },
    plugins: [],
};
