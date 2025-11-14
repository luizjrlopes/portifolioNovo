"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Reset básico */
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0;
    padding: 0;
  }
  
  html, body { 
    height: 100%; 
    margin: 0;
    /* Previne FOUC */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body { 
    background: ${({ theme }) => theme.colors.bg}; 
    color: ${({ theme }) => theme.colors.text};
    /* Força a transição suave */
    transition: background-color 0.2s ease, color 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  
  a { 
    color: ${({ theme }) => theme.colors.accent}; 
    text-decoration: none;
    transition: color 0.2s ease;
  }

  /* Garante que styled-components sempre aplique os estilos */
  [data-styled] {
    display: initial;
  }
`;
