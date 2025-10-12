"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/styles/global";
import { theme } from "@/styles/theme";
import Modal from "react-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
