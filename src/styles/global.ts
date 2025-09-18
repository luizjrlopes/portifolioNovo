"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body { background: ${({ theme }) => theme.colors.bg}; color: ${({ theme }) => theme.colors.text}; }
  a { color: ${({ theme }) => theme.colors.accent}; text-decoration: none; }
`;
