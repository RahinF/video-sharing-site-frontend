/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
   
          "primary": "#f59e0b",        
          "secondary": "#F000B8",                  
          "accent": "#37CDBE",                
          "neutral": "#2F2F2F",                 
          "base-100": "#212121",               
          "info": "#3ABFF8",               
          "success": "#36D399",                
          "warning": "#FBBD23",            
          "error": "#f43f5e",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp")
  ],
}