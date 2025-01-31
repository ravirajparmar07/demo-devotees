/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "../pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**",
  ],
  theme: {
    extend: {
      fontFamily: {
        Outfit: "Outfit",
      },
      colors: {
        link: "#761B1A",
        option: "#C92E2C",
        Dashblack: "#212121",
        Dashblack2: "#545454",
        Dashbutton: "#FD5555",
        lightblack: "#878A99",
        lightgray: "#666666",
        borderGray: "#CED4DA",
        Orange: "#FF6338",
        customGray: "#EAEAEA",
        borderGray: "#E9EBEC",
        count: "#FFF2EC",
      },
      fontSize: {
        22: "1.375rem",
        21: "1.313rem",
        13: "0.813rem",
        26: "1.625rem",
        24: "1.5rem",
        28: "1.75rem",
        10: "0.625rem",
        11: "0.688rem",
        8: "0.5rem",
      },
      margin: {
        30: "1.875rem",
        17: "1.063rem",
        38: "2.375rem",
        250: "15.625rem",
      },
      height: {
        66: "4.125rem",
        133: "8.313rem",
        92: "5.75rem",
        "calc-full-minus-70": "calc(100vh - 72px)",
        185: "11.563rem",
      },
      width: {
        92: "5.75rem",
        133: "8.313rem",
        580: "36.25rem",
        167: "10.438rem",
      },
      minWidth: {
        138: "8.625rem",
      },
      gap: {
        18: "1.125",
      },
      backgroundColor: {
        button: "#761B1A",
        count: "#FFF2EC",
        darkOrange: "#FF6338",
        DashBg: "#38414A26",
        lightpink: "#FBF8F3",
      },
      borderRadius: {
        4: "0.25rem",
      },
      maxWidth: {
        497: "31.063rem",
        250: "15.625rem",
      },
      padding: {
        55: "3.438rem",
        15: "0.938rem",
        18: "1.125rem",
        93: "5.813rem",
        38: "2.375rem",
        60: "3.75rem",
        30: "1.875rem",
        58: "3.625rem",
        0.1: "0.625rem",
      },
      boxShadow: {
        bs: "0px 1px 2px 0px #38414A26",
      },
      screens: {
        xs: "400px",
        "2xl": "1600px",
      },
      backgroundImage: {
        "custom-pattern": "url('/assets/images/background.jpg')",
      },
    },
  },
  plugins: [],
};
